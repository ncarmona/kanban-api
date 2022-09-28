import { BoardModel } from "../../../domain/models/boardModel/board.model"

export interface BoardRepository {
  create(board: string, user: string): Promise<BoardModel>
}
