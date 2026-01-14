import jwt, {JwtPayload} from "jsonwebtoken";
import {admin} from "../admin";
import {defineSecret} from "firebase-functions/params";
import {HttpsError, onCall} from "firebase-functions/https";
import {Merchandise} from "../types/merchandise";
import {Artist} from "../types/artist";

interface MerchandisePayload extends JwtPayload {
    merchandiseID: string;
}

const db = admin.firestore();
const JWT_SECRET = defineSecret("JWT_SECRET");

export const claimMerchandise = onCall(
  {secrets: [JWT_SECRET], region: "europe-west2"},
  async (request) => {
    const jwtSecret = JWT_SECRET.value();
    const auth = request.auth;
    const {token} = request.data;

    if (!jwtSecret) {
      throw new HttpsError("internal", "jwt secret not assigned");
    }

    if (!auth) {
      throw new HttpsError("unauthenticated", "must be signed in");
    }

    if (!token) {
      throw new HttpsError("invalid-argument", "missing jwt token");
    }

    let payload: MerchandisePayload;
    try {
      payload = jwt.verify(token, jwtSecret) as MerchandisePayload;
    } catch (err) {
      throw new HttpsError("unauthenticated", "bad token");
    }

    const merchandiseID = payload.merchandiseID;

    if (!merchandiseID) {
      throw new HttpsError("invalid-argument", "missing merchandiseID");
    }

    const merchandiseRef = db.collection("merchandise").doc(merchandiseID);
    const merchandiseDoc = await merchandiseRef.get();
    if (!merchandiseDoc.exists) {
      throw new HttpsError("not-found", "merchandise not found");
    }

    const merchandise = merchandiseDoc.data() as Merchandise;

    if (merchandise.status !== "ACTIVE") {
      throw new HttpsError("failed-precondition", "merchandise not activated");
    }

    await merchandiseRef.update(
      {
        buyerID: auth.uid,
        claimedAt: admin.firestore.Timestamp.now(),
        status: "CLAIMED",
      }
    );

    const artist = await db.collection("artists").doc(merchandise.mbid).get();
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
