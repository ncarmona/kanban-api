import { generateAuthToken } from "./auth"
import { CookieOptions, Response } from "express"
import { IUser } from "@interfaces/IUser"
export function generateAuthCookie(res: Response, user: IUser): void {
  const expires = new Date()
  expires.setTime(new Date().getTime() + 3600000 * 24 * 14)

  const tokenOptions: CookieOptions = {
    sameSite: "lax",
    httpOnly: true,
    secure: true,
    expires,
  }
  const publicTokenOptions: CookieOptions = {
    sameSite: "lax",
    httpOnly: false,
    secure: true,
    expires,
  }
  const privateTokenOptions: CookieOptions = {
    sameSite: "lax",
    httpOnly: true,
    secure: true,
    expires,
  }

  res.cookie("auth", generateAuthToken(user), tokenOptions)
  res.cookie("public_auth", expires, publicTokenOptions)
  res.cookie("private_auth", expires, privateTokenOptions)
}
