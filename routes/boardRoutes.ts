import { Application, Response, Request } from "express"
import { IResponse } from "../core/routes/IResponse"
import { IRoute } from "../core/routes/IRoute"
import {
  registeredUser,
  requiredParameters,
  RequestObject,
} from "../core/middlewares"
import { allowAll } from "../core/cors"
import { BoardController } from "../infrastructure/controllers/boardController"
import cors from "cors"

export class BoardRoutes implements IRoute {
  private readonly base_route: string
  private readonly core: Application
  private readonly boardController: BoardController

  constructor(core: Application, base_route: string) {
    this.base_route = base_route
    this.core = core
    this.boardController = new BoardController()

    this.routes()
  }
  routes(): void {
    this.createBoard()
    this.getBoard("/:name")
    this.boardExists("/:name/exists")
    this.enableBoard("/:name/enable")
    this.disableBoard("/:name/disable")
    this.deleteBoard("/:name")
    this.updateBoard("/:name")
  }
  private createBoard(action?: string) {
    const route =
      action !== undefined ? this.base_route + action : this.base_route
    const middlewares = [
      cors(allowAll),
      registeredUser(),
      requiredParameters(["name"], RequestObject.BODY),
    ]
    this.core.post(route, middlewares, async (req: Request, res: Response) => {
      const { _id: user } = res.locals.user
      const { name } = req.body
      const response: IResponse = await this.boardController.create(name, user)
      res.status(response.status_code).send(response)
    })
  }

  private getBoard(action?: string) {
    const route =
      action !== undefined ? this.base_route + action : this.base_route
    const middlewares = [cors(allowAll), registeredUser()]
    this.core.get(route, middlewares, async (req: Request, res: Response) => {
      const { name } = req.params
      const response: IResponse = await this.boardController.get(name as string)
      res.status(response.status_code).send(response)
    })
  }
  private boardExists(action?: string) {
    const route =
      action !== undefined ? this.base_route + action : this.base_route
    const middlewares = [cors(allowAll), registeredUser()]
    this.core.get(route, middlewares, async (req: Request, res: Response) => {
      const { name } = req.params
      const response: IResponse = await this.boardController.exists(
        name as string
      )
      res.status(response.status_code).send(response)
    })
  }
  private enableBoard(action?: string) {
    const route =
      action !== undefined ? this.base_route + action : this.base_route
    const middlewares = [cors(allowAll), registeredUser()]
    this.core.put(route, middlewares, async (req: Request, res: Response) => {
      const { name } = req.params
      const response: IResponse = await this.boardController.enable(
        name as string
      )
      res.status(response.status_code).send(response)
    })
  }
  private disableBoard(action?: string) {
    const route =
      action !== undefined ? this.base_route + action : this.base_route
    const middlewares = [cors(allowAll), registeredUser()]
    this.core.put(route, middlewares, async (req: Request, res: Response) => {
      const { name } = req.params
      const response: IResponse = await this.boardController.disable(
        name as string
      )
      res.status(response.status_code).send(response)
    })
  }
  private deleteBoard(action?: string) {
    const route =
      action !== undefined ? this.base_route + action : this.base_route
    const middlewares = [cors(allowAll), registeredUser()]
    this.core.delete(
      route,
      middlewares,
      async (req: Request, res: Response) => {
        const { _id: userRequester } = res.locals.user
        const { name } = req.params
        const response: IResponse = await this.boardController.delete(
          name as string,
          userRequester
        )
        res.status(response.status_code).send(response)
      }
    )
  }
  private updateBoard(action?: string) {
    const route =
      action !== undefined ? this.base_route + action : this.base_route
    const middlewares = [
      cors(allowAll),
      registeredUser(),
      requiredParameters(["newName"], RequestObject.BODY),
    ]
    this.core.put(route, middlewares, async (req: Request, res: Response) => {
      const { _id: userRequester } = res.locals.user
      const { newName } = req.body
      const { name } = req.params
      const response: IResponse = await this.boardController.update(
        name,
        newName,
        userRequester
      )
      res.status(response.status_code).send(response)
    })
  }
}
