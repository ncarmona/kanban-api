import { IResponse } from "../../core/routes/IResponse"
import { BoardUseCases } from "../../application/usecases/boardUseCases"
import { MongoDBBoardRepository } from "../repositories/boardRepository/mongoDBBoardRepository"
import { BoardRepository } from "../repositories/boardRepository/boardRepository"
import { BoardModel } from "../../domain/models/boardModel/board.model"
import { IBoard } from "../../domain/interfaces/IBoard"
import {
  createBoardSuccessful,
  retrievedBoard,
  boardAlreadyExists,
  boardAlreadyExistsShowName,
  boardEnabled,
  boardDoesNotExists,
  boardDisabled,
  boardDeleted,
  updatedBoard,
} from "../../responses/board/boardResponses"
import { unexpectedError } from "../../core/responses/responses"

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
    try {
      const boardModel: BoardModel = await this.boardUseCases.get(formatedName)

      const boardDoesNotExistsOrDisabled =
        (boardModel !== null && boardModel.getDisabled()) || boardModel === null

      return boardDoesNotExistsOrDisabled
        ? boardDoesNotExists(formatedName)
        : retrievedBoard(boardModel.getModel())
    } catch (error) {
      return unexpectedError()
    }
  }
  async exists(name: string): Promise<IResponse> {
    const formatedName: string = name.replace(/-/g, " ")
    const boardExists: boolean = await this.boardUseCases.exists(formatedName)

    return boardAlreadyExists(boardExists)
  }
  async enable(board: string): Promise<IResponse> {
    const formatedName: string = board.replace(/-/g, " ")
    try {
      const enabledBoard: BoardModel = await this.boardUseCases.enable(
        formatedName
      )
      return enabledBoard === null
        ? boardDoesNotExists(formatedName)
        : boardEnabled(enabledBoard.getModel())
    } catch (error) {
      return unexpectedError()
    }
  }
  async disable(board: string): Promise<IResponse> {
    const formatedName: string = board.replace(/-/g, " ")
    try {
      const enabledBoard: BoardModel = await this.boardUseCases.disable(
        formatedName
      )
      return enabledBoard === null
        ? boardDoesNotExists(formatedName)
        : boardDisabled(enabledBoard.getModel())
    } catch (error) {
      return unexpectedError()
    }
  }
  async delete(board: string): Promise<IResponse> {
    const formatedName: string = board.replace(/-/g, " ")
    try {
      const enabledBoard: BoardModel = await this.boardUseCases.delete(
        formatedName
      )
      return enabledBoard === null
        ? boardDoesNotExists(formatedName)
        : boardDeleted(enabledBoard.getModel())
    } catch (error) {
      return unexpectedError()
    }
  }
  async update(board: string, newName: string): Promise<IResponse> {
    const formatedName: string = board.replace(/-/g, " ")
    try {
      const enabledBoard: BoardModel = await this.boardUseCases.update(
        formatedName,
        newName
      )
      return enabledBoard === null
        ? boardDoesNotExists(formatedName)
        : updatedBoard(enabledBoard.getModel())
    } catch (error) {
      return unexpectedError()
    }
  }
}
