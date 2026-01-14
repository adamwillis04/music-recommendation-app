export interface Merchandise {
  merchandiseId: string,
  mbid: string,
  createdAt: FirebaseFirestore.Timestamp,
  buyerID?: string | null,
  claimedAt?: FirebaseFirestore.Timestamp | null,
  status: "CREATED" | "ACTIVE" | "CLAIMED";
}
