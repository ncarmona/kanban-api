import { IResponse } from "../../core/routes/IResponse"
import { databaseCleared, databaseNotCleared } from "./testResponses"

describe("Test responses. DatabaseCleared", () => {
  const status_code = 200
  const dropOK = "Database cleared"
  let response: IResponse
  beforeAll(() => {
    response = databaseCleared()
  })
  it("Status code must be 200", () => {
    expect(response.status_code).toBe(status_code)
  })
  it("Message field must be correct", () => {
    expect(response.message).toStrictEqual(dropOK)
  })
})

describe("Test responses. DatabaseNotCleared", () => {
  const status_code = 200
  const dropOK = "Can not clear database"
  let response: IResponse
  beforeAll(() => {
    response = databaseNotCleared()
  })
  it("Status code must be 200", () => {
    expect(response.status_code).toBe(status_code)
  })
  it("Message field must be correct", () => {
    expect(response.message).toStrictEqual(dropOK)
  })
})
