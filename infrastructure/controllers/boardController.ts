import { IResponse } from "../../core/routes/IResponse"
import { BoardUseCases } from "../../application/usecases/boardUseCases"
import { MongoDBBoardRepository } from "../repositories/boardRepository/mongoDBBoardRepository"
import { BoardRepository } from "../repositories/boardRepository/boardRepository"
import { BoardModel } from "../../domain/models/boardModel/board.model"
import { IBoard } from "../../domain/interfaces/IBoard"
import { createBoardSuccessful } from "../../responses/board/boardResponses"

export class BoardController {
  private readonly boardUseCases: BoardUseCases
  private readonly mongoDBBoardRepository: BoardRepository
  constructor() {
    this.mongoDBBoardRepository = new MongoDBBoardRepository()
    this.boardUseCases = new BoardUseCases(this.mongoDBBoardRepository)
  }
  async create(name: string, user: string): Promise<IResponse> {
    const board: BoardModel = await this.boardUseCases.create(name, user)
    const boardObject: IBoard = board.getModel()

    return createBoardSuccessful(boardObject)
  }
}
