import { BoardModel } from "../../../domain/models/boardModel/board.model"

export interface BoardRepository {
  create(board: string, user: string): Promise<BoardModel>
  get(board: string): Promise<BoardModel>
  exists(board: string): Promise<boolean>
  enable(board: string): Promise<BoardModel>
  disable(board: string): Promise<BoardModel>
}
