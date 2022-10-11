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
  get(board: string): Promise<BoardModel> {
    return this.database.get(board)
  }
  exists(board: string): Promise<boolean> {
    return this.database.exists(board)
  }
  enable(board: string): Promise<BoardModel> {
    return this.database.enable(board)
  }
  disable(board: string): Promise<BoardModel> {
    return this.database.disable(board)
  }
  delete(board: string): Promise<BoardModel> {
    return this.database.delete(board)
  }
  update(board: string, newName: string): Promise<BoardModel> {
    return this.database.update(board, newName)
  }
  inviteUser(board: string, id: string): Promise<BoardModel> {
    return this.database.inviteUser(board, id)
  }
  kickUser(board: string, id: string): Promise<BoardModel> {
    return this.database.kickUser(board, id)
  }
}
