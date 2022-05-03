import { Response, Request, NextFunction } from "express"
import { IResponse } from "./routes/IResponse"
import { missingParameters } from "./responses/responses"
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
    const validParam: boolean = requiredParameters.every((param: string) =>
      parameters.includes(param)
    )
    const response: IResponse = missingParameters(
      parameters,
      requiredParameters
    )
    validParam ? next() : res.status(response.status_code).send(response)
  }
}
