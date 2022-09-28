import { IBoard } from "../../domain/interfaces/IBoard"
import { IResponse } from "../../core/routes/IResponse"

export function createBoardSuccessful(data: IBoard): IResponse {
  return {
    data,
    message: "Board created successfully",
    status_code: 200,
  }
}

export function boardAlreadyExists(exists: boolean): IResponse {
  return {
    data: { exists },
    message: exists ? "Board exists" : "Board does not exists",
    status_code: 200,
  }
}
