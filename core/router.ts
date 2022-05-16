import { Application } from "express"
import { AuthRoutes } from "../routes/authRoutes"
import { UserRoutes } from "@routes/userRoutes"

export function router(core: Application) {
  new AuthRoutes(core, "/auth")
  new UserRoutes(core, "/user")
}
