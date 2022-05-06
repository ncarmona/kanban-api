import { IAuth } from "./models/IAuth"
import { generateAuthToken } from "./auth"
import { CookieOptions, Response } from "express"
export function generateAuthCookie(res: Response, auth: IAuth): void {
  const options: CookieOptions = {
    sameSite: "lax",
    httpOnly: true,
    secure: true,
  }
  res.cookie("auth", generateAuthToken(auth), options)
}
