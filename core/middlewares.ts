import { Response, Request, NextFunction } from "express"
import { IResponse } from "./routes/IResponse"
import { missingParameters } from "./responses/responses"
export function requiredParameters(requiredParameters: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parameters: string[] = Object.keys(req.body)
    const validParam: boolean = parameters.every((param: string) =>
      requiredParameters.includes(param)
    )
    const response: IResponse = missingParameters(
      parameters,
      requiredParameters
    )
    validParam ? next() : res.status(response.status_code).send(response)
  }
}
