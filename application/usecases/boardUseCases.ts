import { BoardModel } from "../../domain/models/boardModel/board.model"
import { BoardRepository } from "../../infrastructure/repositories/boardRepository/boardRepository"
export class BoardUseCases {
  private readonly database: BoardRepository

  constructor(database: BoardRepository) {
    this.database = database
  }

  create(board: string, user: string): Promise<BoardModel> {
    return this.database.create(board, user)
  }
}
