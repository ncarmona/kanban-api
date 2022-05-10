import { generateAuthToken } from "./auth"
import { CookieOptions, Response } from "express"
import { IUser } from "@interfaces/IUser"
export function generateAuthCookie(res: Response, user: IUser): void {
  const expires = new Date()
  expires.setTime(new Date().getTime() + 3600000 * 24 * 14)

  const options: CookieOptions = {
    sameSite: "lax",
    httpOnly: true,
    secure: true,
    expires,
  }
  res.cookie("auth", generateAuthToken(user), options)
}
