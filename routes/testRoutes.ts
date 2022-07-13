import { IRoute } from "../core/routes/IRoute"
import { Application, Response, Request } from "express"
import { guestUser } from "../core/middlewares"
import cors from "cors"
import { allowAll } from "../core/cors"

export class TestRoutes implements IRoute {
  private readonly base_route: string
  private readonly core: Application

  constructor(core: Application, base_route: string) {
    this.base_route = base_route
    this.core = core

    this.routes()
  }

  routes(): void {
    this.dropCollection("/drop-collections")
  }

  private dropCollection(action: string) {
    const route = this.base_route + action
    const middlewares = [cors(allowAll), guestUser()]
    this.core.put(route, middlewares, async (req: Request, res: Response) => {
      /* const response: IResponse = await authController.signup(auth) */
      res.status(200).send("Route works ok")
    })
  }
}
