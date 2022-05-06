import { IAuth } from "./models/IAuth"
import { generateAuthToken } from "./auth"
import { CookieOptions, Response } from "express"
export function generateAuthCookie(res: Response, auth: IAuth): void {
  const expires = new Date()
  expires.setTime(new Date().getTime() + 3600000 * 24 * 14)

  const options: CookieOptions = {
    sameSite: "lax",
    httpOnly: true,
    secure: true,
    expires,
  }
  res.cookie("auth", generateAuthToken(auth), options)
}
