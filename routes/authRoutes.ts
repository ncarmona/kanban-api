import { Application, Response } from "express"
import { IResponse } from "../core/routes/IResponse"
import { IRoute } from "../core/routes/IRoute"
import { signupSuccessful } from "../responses/authResponses"

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
    const response: IResponse = signupSuccessful()
    const route = this.base_route + action

    this.core.get(route, (_: unknown, res: Response) =>
      res.status(response.status_code).send(response)
    )
  }
}
