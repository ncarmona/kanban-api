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
    const board: BoardModel | null = await this.boardUseCases.create(name, user)
    let response: IResponse
    if (board !== null) {
      const boardObject: IBoard = board.getModel()
      response = createBoardSuccessful(boardObject)
    } else response = boardAlreadyExistsShowName(name)

    return response
  }
  async get(name: string): Promise<IResponse> {
    const formatedName: string = name.replace(/-/g, " ")
    const board: BoardModel = await this.boardUseCases.get(formatedName)
    const boardObject: IBoard = board.getModel()

    return retrievedBoard(boardObject)
  }
  async exists(name: string): Promise<IResponse> {
    const formatedName: string = name.replace(/-/g, " ")
    const boardExists: boolean = await this.boardUseCases.exists(formatedName)

    return boardAlreadyExists(boardExists)
  }
}
