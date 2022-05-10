import { sign, SignOptions, verify } from "jsonwebtoken"
import fs from "fs"
import { IUser } from "@interfaces/IUser"

export function generateAuthToken(user: IUser): string {
  const payload = user
  const privateKey = fs.readFileSync("keys/cookies/private.key")

  const algorithm: SignOptions = {
    algorithm: "RS512",
  }

  return sign(payload, privateKey, algorithm)
}

export function decodeAuthToken(token: string): IUser {
  const publicKey = fs.readFileSync("keys/cookies/public.key")

  return verify(token, publicKey) as IUser
}
