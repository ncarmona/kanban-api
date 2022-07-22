import { IAuth } from "@core/models/IAuth"
import { Application, Response, Request } from "express"
import { IResponse } from "@core/routes/IResponse"
import { IRoute } from "@core/routes/IRoute"
import { AuthController } from "@controllers/authController"
import { signoutSuccessful } from "@responses/authResponses"
import {
  requiredParameters,
  RequestObject,
  guestUser,
  registeredUser,
} from "@core/middlewares"
import { allowAll } from "@core/cors"
import { generateAuthCookie } from "@core/cookies"
import cors from "cors"
import { IUser } from "@interfaces/IUser"

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
    this.activateAccount("/activation")
    this.signin("/signin")
    this.signout("/signout")
  }

  private createRoute(action: string) {
    const authController = new AuthController()
    const route = this.base_route + action
    const middlewares = [
      requiredParameters(["email", "password"], RequestObject.BODY),
      cors(allowAll),
      guestUser(),
    ]

    this.core.post(route, middlewares, async (req: Request, res: Response) => {
      const { email, password } = req.body
      const auth: IAuth = {
        email,
        password,
      }
      const response: IResponse = await authController.signup(auth)
      res.status(response.status_code).send(response)
    })
  }

  private activateAccount(action: string) {
    const authController = new AuthController()
    const route = this.base_route + action
    const middlewares = [
      requiredParameters(["email", "activation_token"], RequestObject.QUERY),
      cors(allowAll),
      guestUser(),
    ]
    this.core.get(route, middlewares, async (req: Request, res: Response) => {
      const auth: IAuth = {
        email: req.query.email as string,
        activation_token: req.query.activation_token as string,
      }
      const response: IResponse = await authController.activation(auth)
      res.status(response.status_code).send(response)
    })
  }
  private signin(action: string) {
    const authController = new AuthController()
    const route = this.base_route + action
    const middlewares = [
      requiredParameters(["email", "password"], RequestObject.BODY),
      cors(allowAll),
      guestUser(),
    ]
    this.core.post(route, middlewares, async (req: Request, res: Response) => {
      const { email, password } = req.body
      const auth: IAuth = {
        email,
        password,
      }
      const response: IResponse = await authController.signin(auth)
      if (response.status_code === 200)
        generateAuthCookie(res, response.data as IUser)
      const userData = response.data as IUser
      delete userData._id
      response.data = userData
      res.status(response.status_code).send(response)
    })
  }
  private signout(action: string) {
    const route = this.base_route + action
    const middlewares = [cors(allowAll), registeredUser()]

    this.core.post(route, middlewares, async (_req: Request, res: Response) => {
      res.clearCookie("auth")
      res.status(200).send(signoutSuccessful())
    })
  }
}
