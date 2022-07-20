import { Application } from "express"
import { AuthRoutes } from "../routes/authRoutes"
import { UserRoutes } from "@routes/userRoutes"
import { TestRoutes } from "@routes/testRoutes"
import cors from "cors"
import { allowAll } from "./cors"
export function router(core: Application) {
  core.options("*", cors(allowAll))

  new AuthRoutes(core, "/auth")
  new UserRoutes(core, "/user")
  if (process.env.ENVIRONMENT === "test") new TestRoutes(core, "/test")
}
