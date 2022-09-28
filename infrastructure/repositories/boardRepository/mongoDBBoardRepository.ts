import { IBoard } from "../../../domain/interfaces/IBoard"
import { BoardRepository } from "./boardRepository"
import { MongoDBConnector } from "../../../core/repository/connectors/MongoDBConnector"
import { IConnector } from "../../../core/repository/connectors/IConnector"
import { FilterQuery } from "mongoose"
import { mongoDBBoard } from "../../../core/repository/MongoDB/Schemas/Board"
import { BoardModel } from "../../../domain/models/boardModel/board.model"

export class MongoDBBoardRepository implements BoardRepository {
  private readonly connector: IConnector

  constructor() {
    this.connector = new MongoDBConnector()
    this.connector.link()
    this.hiddenFieldsBoard = ["-_id"]
    this.hiddenFieldsUser = [
      "-password",
      "-email",
      "-modified_at",
      "-disabled",
      "-deleted",
      "-activation_token",
    ]
  }
  async create(name: string, user: string): Promise<BoardModel> {
    const board: IBoard = {
      created_at: new Date(),
      deleted: false,
      disabled: false,
      modified_at: new Date(),
      name,
      owner: user,
    }

    try {
      const exists = await this.exists(name)
      if (!exists) {
        const retrievedBoard = await mongoDBBoard.create(board)
        return new BoardModel(retrievedBoard)
      } else return null
    } catch (error) {
      return error
    }
  }
  async exists(board: string): Promise<boolean> {
    const filter: FilterQuery<unknown> = { name: board }
    try {
      return (await mongoDBBoard.exists(filter)) !== null
    } catch (error) {
      console.log(error)
    }
  }
}
