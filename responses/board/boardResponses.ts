import { IBoard } from "../../domain/interfaces/IBoard"
import { IResponse } from "../../core/routes/IResponse"

export function createBoardSuccessful(data: IBoard): IResponse {
  return {
    data,
    message: "Board created successfully",
    status_code: 200,
  }
}
