import { IBoard } from "../../../domain/interfaces/IBoard"
import { BoardRepository } from "./boardRepository"
import { MongoDBConnector } from "../../../core/repository/connectors/MongoDBConnector"
import { IConnector } from "../../../core/repository/connectors/IConnector"
import { FilterQuery, ProjectionType, QueryOptions } from "mongoose"
import { mongoDBBoard } from "../../../core/repository/MongoDB/Schemas/Board"
import { BoardModel } from "../../../domain/models/boardModel/board.model"

export class MongoDBBoardRepository implements BoardRepository {
  private readonly connector: IConnector
  private readonly hiddenFieldsBoard: string[]
  private readonly hiddenFieldsUser: string[]

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
      participants: [],
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
  async get(board: string): Promise<BoardModel> {
    const filter: FilterQuery<unknown> = { name: board, deleted: false }
    try {
      const board: IBoard = await mongoDBBoard
        .findOne(filter)
        .populate("owner", this.hiddenFieldsUser)
        .populate("participants", this.hiddenFieldsUser)
        .select(this.hiddenFieldsBoard)
      return new BoardModel(board)
    } catch (error) {
      return null
    }
  }
  async exists(board: string): Promise<boolean> {
    const filter: FilterQuery<unknown> = {
      name: board,
      deleted: false,
      disabled: false,
    }
    try {
      return (await mongoDBBoard.exists(filter)) !== null
    } catch (error) {
      return null
    }
  }
  async enable(board: string): Promise<BoardModel> {
    const filter: FilterQuery<unknown> = { name: board, deleted: false }
    const projection: ProjectionType<unknown> = {
      disabled: false,
      modified_at: new Date(),
    }
    const options: QueryOptions = { new: true }
    const hiddenFields: string[] = [...this.hiddenFieldsBoard, "-owner"]
    try {
      const enabledBoard = await mongoDBBoard
        .findOneAndUpdate(filter, projection, options)
        .select(hiddenFields)
      return new BoardModel(enabledBoard)
    } catch (error) {
      return null
    }
  }
  async disable(board: string): Promise<BoardModel> {
    const filter: FilterQuery<unknown> = { name: board, deleted: false }
    const projection: ProjectionType<unknown> = {
      disabled: true,
      modified_at: new Date(),
    }
    const options: QueryOptions = { new: true }
    const hiddenFields: string[] = [...this.hiddenFieldsBoard, "-owner"]
    try {
      const disabledBoard = await mongoDBBoard
        .findOneAndUpdate(filter, projection, options)
        .select(hiddenFields)
      return new BoardModel(disabledBoard)
    } catch (error) {
      return null
    }
  }
  async delete(board: string): Promise<BoardModel> {
    const filter: FilterQuery<unknown> = { name: board }
    const projection: ProjectionType<unknown> = {
      deleted: true,
      modified_at: new Date(),
    }
    const options: QueryOptions = { new: true }
    const hiddenFields: string[] = [...this.hiddenFieldsBoard, "-owner"]
    try {
      const deletedBoard = await mongoDBBoard
        .findOneAndUpdate(filter, projection, options)
        .select(hiddenFields)
      return new BoardModel(deletedBoard)
    } catch (error) {
      return error
    }
  }
  async update(board: string, newName: string): Promise<BoardModel> {
    const filter: FilterQuery<unknown> = { name: board }
    const projection: ProjectionType<unknown> = {
      name: newName,
      modified_at: new Date(),
    }
    const options: QueryOptions = { new: true }
    try {
      const deletedBoard = await mongoDBBoard
        .findOneAndUpdate(filter, projection, options)
        .select(this.hiddenFieldsBoard)
      return new BoardModel(deletedBoard)
    } catch (error) {
      return error
    }
  }
  async inviteUser(board: string, userID: string): Promise<BoardModel> {
    try {
      const filter: FilterQuery<unknown> = { name: board }
      const projection: ProjectionType<unknown> = {
        $push: { participants: userID },
      }
      const options: QueryOptions = { new: true }
      const participantAdded = await mongoDBBoard.findOneAndUpdate(
        filter,
        projection,
        options
      )
      return new BoardModel(participantAdded)
    } catch (error) {
      return error
    }
  }
  async kickUser(board: string, updatedList: string[]): Promise<BoardModel> {
    try {
      const filter: FilterQuery<unknown> = { name: board }
      const projection: ProjectionType<unknown> = {
        participants: updatedList,
      }
      const options: QueryOptions = { new: true }
      const updatedParticipants = await mongoDBBoard.findOneAndUpdate(
        filter,
        projection,
        options
      )
      return new BoardModel(updatedParticipants)
    } catch (error) {
      return error
    }
  }
}
