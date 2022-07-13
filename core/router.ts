import { Application } from "express"
import { AuthRoutes } from "../routes/authRoutes"
import { UserRoutes } from "@routes/userRoutes"
import { TestRoutes } from "@routes/testRoutes"

export function router(core: Application) {
  new AuthRoutes(core, "/auth")
  new UserRoutes(core, "/user")
  if (process.env.ENVIRONMENT === "test") new TestRoutes(core, "/test")
}
