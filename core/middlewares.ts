import { Response, Request, NextFunction } from "express"
import { IResponse } from "./routes/IResponse"
import {
  mustBeGuest,
  userMustBeRegistered,
  missingParameters,
} from "./responses/responses"
import { decodeAuthToken } from "./auth"
import Multer from "multer"

export enum RequestObject {
  QUERY = "query",
  BODY = "body",
}
export function requiredParameters(
  requiredParameters: string[],
  reqObj: RequestObject
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parameters: string[] = Object.keys(req[reqObj])
    const validParam: boolean = requiredParameters.every((param: string) => {
      const noBlankParameterValue =
        new String(req[reqObj][param]).trim().length > 0
      parameters.includes(param) && noBlankParameterValue
    })
    const response: IResponse = missingParameters(
      parameters,
      requiredParameters
    )
    validParam ? next() : res.status(response.status_code).send(response)
  }
}

export function registeredUser() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { auth, public_auth, private_auth } = req.cookies

    const response: IResponse = userMustBeRegistered()
    if (auth !== undefined && public_auth === private_auth) {
      res.locals.user = decodeAuthToken(req.cookies.auth)
      next()
    } else res.status(response.status_code).send(response)
  }
}

export function guestUser() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { auth } = req.cookies
    const response: IResponse = mustBeGuest()
    auth === undefined
      ? next()
      : res.status(response.status_code).send(response)
  }
}

export const upload = Multer({ dest: "./uploads/" })
