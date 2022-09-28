import { IBoard } from "../../../domain/interfaces/IBoard"
import { BoardRepository } from "./boardRepository"
import { MongoDBConnector } from "../../../core/repository/connectors/MongoDBConnector"
import { IConnector } from "../../../core/repository/connectors/IConnector"
import { MongooseError } from "mongoose"
import { mongoDBBoard } from "../../../core/repository/MongoDB/Schemas/Board"
import { BoardModel } from "../../../domain/models/boardModel/board.model"

export class MongoDBBoardRepository implements BoardRepository {
  private readonly connector: IConnector

  constructor() {
    this.connector = new MongoDBConnector()
    this.connector.link()
  }
  create(name: string, user: string): Promise<BoardModel> {
    return new Promise((resolve, reject) => {
      const board: IBoard = {
        created_at: new Date(),
        deleted: false,
        disabled: false,
        modified_at: new Date(),
        name,
        owner: user,
      }
      mongoDBBoard
        .create(board)
        .then((b: IBoard) => resolve(new BoardModel(b)))
        .catch((e: MongooseError) => reject(e))
    })
  }
}
