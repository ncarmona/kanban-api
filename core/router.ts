import { Application } from "express"
import { AuthRoutes } from "../routes/authRoutes"

export function router(core: Application) {
  new AuthRoutes(core, "/auth")
}
