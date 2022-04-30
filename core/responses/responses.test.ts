import { IResponse } from "../routes/IResponse"
import { missingParameters, unexpectedError } from "./responses"

describe("Response missing parameters", () => {
  const passedParams: string[] = ["param1", "param3"]
  const requiredParams: string[] = ["param1", "param2", "param3"]

  const passedParamsString: string = passedParams.join(", ")
  const requiredParamsString: string = requiredParams.join(", ")

  const status_code = 500

  const message: string =
    "Missing parameters. Passed parameters: " +
    passedParamsString +
    ". Required parameters: " +
    requiredParamsString

  let response: IResponse

  beforeAll(() => {
    response = missingParameters(passedParams, requiredParams)
  })

  it("status_code must be 500", () => {
    expect(response.status_code).toBe(status_code)
  })
  it("Message must be a list of passed parameters and required parameters.", () => {
    expect(message).toStrictEqual(response.message)
  })
})

describe("Response unexpected error", () => {
  const status_code = 500
  const message = "Unexpected error, check logs for more details."

  let response: IResponse

  beforeAll(() => {
    response = unexpectedError()
  })

  it("status_code must be 500", () => {
    expect(response.status_code).toBe(status_code)
  })

  it("Message field must be 'unexpected error, chck logs for more details", () => {
    expect(response.message).toStrictEqual(message)
  })
})
