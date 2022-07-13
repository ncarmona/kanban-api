import { IRoute } from "../core/routes/IRoute"
import { Application, Response, Request } from "express"
import { guestUser } from "../core/middlewares"
import cors from "cors"
import { allowAll } from "../core/cors"
import { IResponse } from "@core/routes/IResponse"
import { TestController } from "@controllers/testController"
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
    const testController = new TestController()
    const route = this.base_route + action
    const middlewares = [cors(allowAll), guestUser()]
    this.core.put(route, middlewares, async (req: Request, res: Response) => {
      const response: IResponse = await testController.dropCollections()
      res.status(200).send(response)
    })
  }
}
