export interface Interaction {
  interactionId: string,
  mbid: string,
  senderID: string,
  startedAt: FirebaseFirestore.Timestamp,
  startedLocation: { lat: number; lng: number },
  receiverID?: string | null,
  endedAt?: FirebaseFirestore.Timestamp | null,
  endedLocation?: { lat: number; lng: number } | null,
  status: "CREATED" | "COMPLETED" | "EXPIRED";
  expiresAt: FirebaseFirestore.Timestamp;
}
