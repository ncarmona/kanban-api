import { BoardModel } from "../../../domain/models/boardModel/board.model"

export interface BoardRepository {
  create(board: string, user: string): Promise<BoardModel>
  get(board: string): Promise<BoardModel>
  exists(board: string): Promise<boolean>
  enable(board: string): Promise<BoardModel>
  disable(board: string): Promise<BoardModel>
  delete(board: string): Promise<BoardModel>
  update(board: string, newName: string): Promise<BoardModel>
  inviteUser(board: string, email: string): Promise<BoardModel>
  kickUser(board: string, id: string): Promise<BoardModel>
}
