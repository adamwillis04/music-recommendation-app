import { Role } from "./roles"
import { VerificationMethod } from "./verification"

export type Profile = {
  userID: string
  email: string
  role: Role
  username?: string | null
  artistCode?: string | null
  artist?: string | null
  mbid?: string | null
  venue?: string | null
  verMethod?: VerificationMethod | null
  verStatus?: boolean | null
}