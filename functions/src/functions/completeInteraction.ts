import {HttpsError, onCall} from "firebase-functions/v2/https";
import {defineSecret} from "firebase-functions/params";
import {Interaction} from "../types/interaction";
import {Artist} from "../types/artist";
import {admin} from "../admin";
import jwt, {JwtPayload} from "jsonwebtoken";

interface InteractionPayload extends JwtPayload {
    interactionId: string;
}

const db = admin.firestore();
const JWT_SECRET = defineSecret("JWT_SECRET");

// eslint-disable-next-line require-jsdoc
function proximityCheck(
  lat1: number, lon1: number, lat2: number, lon2: number
): boolean {
  const radiusMeters = 10;
  const latAvg = (lat1 + lat2) / 2 * (Math.PI / 180);

  const metersPerDegLat = 111_320;
  const metersPerDegLon = 111_320 * Math.cos(latAvg);

  const deltaLat = (lat2 - lat1) * metersPerDegLat;
  const deltaLon = (lon2 - lon1) * metersPerDegLon;

  const distance = Math.sqrt(deltaLat ** 2 + deltaLon ** 2);

  return distance <= radiusMeters;
}

export const completeInteraction = onCall(
  {secrets: [JWT_SECRET], region: "europe-west2"},
  async (request) => {
    const jwtSecret = JWT_SECRET.value();
    const auth = request.auth;
    const {token, loc} = request.data;

    if (!jwtSecret) {
      throw new HttpsError("internal", "jwt secret not assigned");
    }

    if (!auth) {
      throw new HttpsError("unauthenticated", "must be signed in");
    }

    if (!token) {
      throw new HttpsError("invalid-argument", "missing jwt token");
    }

    let payload: InteractionPayload;
    try {
      payload = jwt.verify(token, jwtSecret) as InteractionPayload;
    } catch (err) {
      throw new HttpsError("unauthenticated", "bad token");
    }

    const interactionId = payload.interactionId;

    if (!interactionId) {
      throw new HttpsError("invalid-argument", "missing interactionID");
    }

    const interactionRef = db.collection("interactions").doc(interactionId);
    const partialInteraction = await interactionRef.get();
    if (!partialInteraction.exists) {
      throw new HttpsError("not-found", "interaction not found");
    }

    const interaction = partialInteraction.data() as Interaction;

    if (interaction.status === "COMPLETED") {
      throw new HttpsError("failed-precondition", "interaction pre-complete");
    }

    if (
      interaction.expiresAt.seconds < admin.firestore.Timestamp.now().seconds
    ) {
      throw new HttpsError("failed-precondition", "interaction expired");
    }

    if (!proximityCheck(
      interaction.startedLocation.lat,
      interaction.startedLocation.lng,
      loc.lat,
      loc.lng)) {
      throw new HttpsError("failed-precondition", "locations too far apart");
    }

    await interactionRef.update(
      {
        receiverID: auth.uid,
        endedAt: admin.firestore.Timestamp.now(),
        endedLocation: loc,
        status: "COMPLETED",
      }
    );

    const artist = await db.collection("artists").doc(interaction.mbid).get();
    if (!artist.exists) {
      throw new HttpsError("not-found", "artist not found");
    }

    const artistObj: Artist = {
      mbid: artist.id,
      ...(artist.data() as Omit<Artist, "mbid">),
    };

    return {artistObj};
  }
);
