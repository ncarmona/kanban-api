import { sign, SignOptions } from "jsonwebtoken"
import fs from "fs"
import { IAuth } from "./models/IAuth"

export function generateAuthToken(auth: IAuth): string {
  const payload = auth
  const privateKey = fs.readFileSync("keys/cookies/private.key")

  const algorithm: SignOptions = {
    algorithm: "RS512",
  }

  return sign(payload, privateKey, algorithm)
}
