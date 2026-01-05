export type VerificationMethod = "admin" | "website"

export const VERIFICATION_METHODS: {
  label: string
  value: VerificationMethod
}[] = [
  { label: "Admin Check", value: "admin" },
  { label: "Official Website", value: "website" },
]