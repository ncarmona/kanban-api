import { IResponse } from "@core/routes/IResponse"
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

export function unexpectedError(): IResponse {
  return {
    data: {},
    message: "Unexpected error, check logs for more details.",
    status_code: 500,
  }
}

export function userMustBeRegistered(): IResponse {
  return {
    data: {},
    message: "Guest can not perform this action.",
    status_code: 401,
  }
}

export function mustBeGuest(): IResponse {
  return {
    data: {},
    message: "Registered users can not perform this action.",
    status_code: 401,
  }
}
