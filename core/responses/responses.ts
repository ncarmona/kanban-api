import { IResponse } from "../routes/IResponse"
export function missingParameters(
  parameters: string[],
  requiredParameters: string[]
): IResponse {
  const passedParams: string = parameters.join(", ")
  const requiredParams: string = requiredParameters.join(", ")
  const message: string =
    "Missing parameters. Passed parameters: " +
    passedParams +
    ". Required parameters: " +
    requiredParams
  return {
    data: {},
    status_code: 500,
    message,
  }
}
