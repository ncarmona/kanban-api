import { IResponse } from "../../core/routes/IResponse"

export function databaseCleared(): IResponse {
  return {
    data: {},
    message: "Database cleared",
    status_code: 200,
  }
}
export function databaseNotCleared(): IResponse {
  return {
    data: {},
    message: "Can not clear database",
    status_code: 200,
  }
}
