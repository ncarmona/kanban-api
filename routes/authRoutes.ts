import { IAuth } from "../core/models/IAuth"
import { Application, Response, Request } from "express"
import { IResponse } from "../core/routes/IResponse"
import { IRoute } from "../core/routes/IRoute"
import { AuthController } from "../infrastructure/controllers/authController"

export class AuthRoutes implements IRoute {
  private readonly base_route: string
  private readonly core: Application

  constructor(core: Application, base_route: string) {
    this.base_route = base_route
    this.core = core

    this.routes()
  }

  routes(): void {
    this.createRoute("/signup")
  }

  private createRoute(action: string) {
    const authController = new AuthController()
    const route = this.base_route + action

    this.core.post(route, async (req: Request, res: Response) => {
      const { email, password } = req.body
      const auth: IAuth = {
        email,
        password,
      }
      const response: IResponse = await authController.signup(auth)
      res.status(response.status_code).send(response)
    })
  }
}
