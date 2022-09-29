import { IBoard } from "../../domain/interfaces/IBoard"
import { IResponse } from "../../core/routes/IResponse"

export function createBoardSuccessful(data: IBoard): IResponse {
  return {
    data,
    message: "Board created successfully",
    status_code: 200,
  }
}

export function retrievedBoard(data: IBoard): IResponse {
  return {
    data,
    message: "Board retrieved successfully",
    status_code: 200,
  }
}

export function boardAlreadyExistsShowName(name: string): IResponse {
  return {
    data: {},
    message: `Board ${name} already exists.`,
    status_code: 500,
  }
}

export function boardAlreadyExists(exists: boolean): IResponse {
  return {
    data: { exists },
    message: exists ? "Board exists" : "Board does not exists",
    status_code: 200,
  }
}

export function boardEnabled(data: IBoard): IResponse {
  return {
    data,
    message: "Board has been enabled successfully",
    status_code: 200,
  }
}

export function boardDisabled(data: IBoard): IResponse {
  return {
    data,
    message: "Board has been disabled successfully",
    status_code: 200,
  }
}

export function boardDoesNotExists(board: string): IResponse {
  return {
    data: {},
    message: `Board ${board} does not exists`,
    status_code: 404,
  }
}
export function boardDeleted(board: IBoard): IResponse {
  return {
    data: board,
    message: `Board ${board.name} has been deleted`,
    status_code: 404,
  }
}
export function updatedBoard(data: IBoard): IResponse {
  return {
    data,
    message: "Board updated successfully",
    status_code: 200,
  }
}
