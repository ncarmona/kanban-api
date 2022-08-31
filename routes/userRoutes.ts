import { Application, Response, Request } from "express"
import { IResponse } from "@core/routes/IResponse"
import { IRoute } from "@core/routes/IRoute"
import { UserController } from "@controllers/userController"
import { registeredUser, upload } from "@core/middlewares"
import { allowAll } from "@core/cors"
import cors from "cors"
import { IUser } from "@interfaces/IUser"

export class UserRoutes implements IRoute {
  private readonly base_route: string
  private readonly core: Application

  constructor(core: Application, base_route: string) {
    this.base_route = base_route
    this.core = core

    this.routes()
  }
  routes(): void {
    this.disable("/disable")
    this.enable("/enable")
    this.delete("")
    this.update("")
    this.getUserData("")
  }
  private update(action: string) {
    const userController = new UserController()
    const route = this.base_route + action
    const middlewares = [
      cors(allowAll),
      registeredUser(),
      upload.single("photo"),
    ]

    this.core.put(route, middlewares, async (req: Request, res: Response) => {
      const { _id } = res.locals.user as IUser
      const userData = req.body as IUser
      const photo: Express.Multer.File = req.file
      userData._id = _id
      const response: IResponse = await userController.update(userData, photo)
      res.status(response.status_code).send(response)
    })
  }
  private getUserData(action: string) {
    const userController = new UserController()
    const route = this.base_route + action
    const middlewares = [cors(allowAll), registeredUser()]
    this.core.get(route, middlewares, async (req: Request, res: Response) => {
      const { _id } = res.locals.user as IUser
      const response: IResponse = await userController.getUserData(_id)
      res.status(response.status_code).send(response)
    })
  }
  private disable(action: string) {
    const userController = new UserController()
    const route = this.base_route + action
    const middlewares = [cors(allowAll), registeredUser()]

    this.core.put(route, middlewares, async (req: Request, res: Response) => {
      const { _id } = res.locals.user as IUser
      const response: IResponse = await userController.disable(_id)
      res.status(response.status_code).send(response)
    })
  }
  private enable(action: string) {
    const userController = new UserController()
    const route = this.base_route + action
    const middlewares = [cors(allowAll), registeredUser()]

    this.core.put(route, middlewares, async (req: Request, res: Response) => {
      const { _id } = res.locals.user as IUser
      const response: IResponse = await userController.enable(_id)
      res.status(response.status_code).send(response)
    })
  }
  private delete(action: string) {
    const userController = new UserController()
    const route = this.base_route + action
    const middlewares = [cors(allowAll), registeredUser()]

    this.core.delete(
      route,
      middlewares,
      async (req: Request, res: Response) => {
        const { _id } = res.locals.user as IUser
        const response: IResponse = await userController.delete(_id)
        res.status(response.status_code).send(response)
      }
    )
  }
}
