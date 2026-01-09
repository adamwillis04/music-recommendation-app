import {HttpsError, onCall} from "firebase-functions/v2/https";
import {defineSecret} from "firebase-functions/params";
import {Interaction} from "../types/interaction";
import {admin} from "../admin";
import * as jwt from "jsonwebtoken";

const db = admin.firestore();
const JWT_SECRET = defineSecret("JWT_SECRET");

export const createInteraction = onCall(
  {secrets: [JWT_SECRET], region: "europe-west2"},
  async (request) => {
    const jwtSecret = JWT_SECRET.value();
    const auth = request.auth;
    const {mbid, loc} = request.data;

    if (!jwtSecret) {
      throw new HttpsError(
        "internal",
        "jwt secret not assigned"
      );
    }

    if (!auth) {
      throw new HttpsError(
        "unauthenticated",
        "must be signed in"
      );
    }

    if (!mbid || !loc) {
      throw new HttpsError(
        "invalid-argument",
        "missing data"
      );
    }

    const interactionRef = db.collection("interactions").doc();

    const interaction: Interaction = {
      interactionId: interactionRef.id,
      mbid: mbid,
      senderID: auth.uid,
      startedAt: admin.firestore.Timestamp.now(),
      startedLocation: loc,
      status: "CREATED",
      expiresAt: admin.firestore.Timestamp.fromMillis(
        Date.now() + 120 * 1000
      ),
    };

    await interactionRef.set(interaction);

    const payload = {
      interactionId: interactionRef.id,
    };

    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: 120,
    });

    return token;
  }
);
