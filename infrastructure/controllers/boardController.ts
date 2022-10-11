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
  updatedBoardSucessfully,
  notOwner,
  userInvitedToBoard,
  userKickedFromBoard,
} from "../../responses/board/boardResponses"
import {
  notAllowedToPerfom,
  unexpectedError,
} from "../../core/responses/responses"
import { IUser } from "@interfaces/IUser"
import { UserRepository } from "@repositories/userRepository/userRepository"
import { UserUseCases } from "@usecases/userUseCases"
import { userDoesNotExists } from "@responses/authResponses"
import { MongoDBUserRepository } from "@repositories/userRepository/mongoDBUserRepository"
import { UserModel } from "@models/userModel/user.model"

export class BoardController {
  private readonly boardUseCases: BoardUseCases
  private readonly mongoDBBoardRepository: BoardRepository
  private readonly userUseCases: UserUseCases
  private readonly mongoDBUserRepository: UserRepository
  constructor() {
    this.mongoDBBoardRepository = new MongoDBBoardRepository()
    this.mongoDBUserRepository = new MongoDBUserRepository()
    this.boardUseCases = new BoardUseCases(this.mongoDBBoardRepository)
    this.userUseCases = new UserUseCases(this.mongoDBUserRepository)
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
  async get(name: string, userRequester: string): Promise<IResponse> {
    const formatedName: string = name.replace(/-/g, " ")
    try {
      const boardModel: BoardModel = await this.boardUseCases.get(formatedName)
      const boardDoesNotExistsOrDisabled =
        (boardModel !== null && boardModel.getDisabled()) || boardModel === null
      let response: IResponse

      if (boardDoesNotExistsOrDisabled)
        response = boardDoesNotExists(formatedName)
      else {
        const owner = (boardModel.getOwner() as IUser)._id.toString()
        const participants = boardModel.getParticipants() as IUser[]
        const participantsIDsArray = participants.map((u: IUser) =>
          u._id.toString()
        )
        const authorizedUsers = [...participantsIDsArray, owner]
        const userRequesterIsAuthorized = authorizedUsers.some(
          (uid: string) => userRequester === uid
        )

        response = userRequesterIsAuthorized
          ? retrievedBoard(boardModel.getModel())
          : notAllowedToPerfom()
      }
      return response
    } catch (error) {
      return unexpectedError()
    }
  }
  async exists(name: string): Promise<IResponse> {
    const formatedName: string = name.replace(/-/g, " ")
    const boardExists: boolean = await this.boardUseCases.exists(formatedName)

    return boardAlreadyExists(boardExists)
  }
  async enable(board: string, userRequester: string): Promise<IResponse> {
    const formatedName: string = board.replace(/-/g, " ")
    try {
      let response: IResponse
      const retrievedBoard = await this.boardUseCases.get(formatedName)
      if (retrievedBoard === null) response = boardDoesNotExists(formatedName)
      else {
        const boardOwner: IUser = retrievedBoard.getOwner() as IUser
        const boardOwnerID: string = boardOwner?._id.toString() ?? null
        if (boardOwnerID === userRequester) {
          const enabledBoard: BoardModel = await this.boardUseCases.enable(
            formatedName
          )
          response = boardEnabled(enabledBoard.getModel())
        } else response = notOwner()
      }
      return response
    } catch (error) {
      return unexpectedError()
    }
  }
  async disable(board: string, userRequester: string): Promise<IResponse> {
    const formatedName: string = board.replace(/-/g, " ")
    try {
      let response: IResponse
      const retrievedBoard = await this.boardUseCases.get(formatedName)
      if (retrievedBoard === null) response = boardDoesNotExists(formatedName)
      else {
        const boardOwner: IUser = retrievedBoard.getOwner() as IUser
        const boardOwnerID: string = boardOwner?._id.toString() ?? null
        if (boardOwnerID === userRequester) {
          const disabledBoard: BoardModel = await this.boardUseCases.disable(
            formatedName
          )
          response = boardDisabled(disabledBoard.getModel())
        } else response = notOwner()
      }
      return response
    } catch (error) {
      return unexpectedError()
    }
  }
  async delete(board: string, userRequester: string): Promise<IResponse> {
    const formatedName: string = board.replace(/-/g, " ")
    try {
      let response: IResponse
      const retrievedBoard = await this.boardUseCases.get(formatedName)
      if (retrievedBoard === null) response = boardDoesNotExists(formatedName)
      else {
        const boardOwner: IUser = retrievedBoard.getOwner() as IUser
        const boardOwnerID: string = boardOwner?._id.toString() ?? null
        if (boardOwnerID === userRequester) {
          const deletedBoard: BoardModel = await this.boardUseCases.delete(
            formatedName
          )

          response = boardDeleted(deletedBoard.getModel())
        } else response = notOwner()
      }
      return response
    } catch (error) {
      return unexpectedError()
    }
  }
  async update(
    board: string,
    newName: string,
    userRequester: string
  ): Promise<IResponse> {
    const formatedName: string = board.replace(/-/g, " ")
    try {
      let response: IResponse
      const retrievedBoard = await this.boardUseCases.get(formatedName)
      if (retrievedBoard === null) response = boardDoesNotExists(formatedName)
      else {
        const boardOwner: IUser = retrievedBoard.getOwner() as IUser
        const boardOwnerID: string = boardOwner?._id.toString() ?? null
        if (boardOwnerID === userRequester) {
          const updatedBoard: BoardModel = await this.boardUseCases.update(
            formatedName,
            newName
          )
          response = updatedBoardSucessfully(updatedBoard.getModel())
        } else response = notOwner()
      }

      return response
    } catch (error) {
      console.log(error)
      return unexpectedError()
    }
  }
  async inviteUser(board: string, email: string, owner: string) {
    const formatedName: string = board.replace(/-/g, " ")
    try {
      let response: IResponse
      const invitedUser: UserModel = await this.userUseCases.getUserByEmail(
        email
      )
      if (invitedUser?.getId() === undefined) response = userDoesNotExists()
      else {
        const invitedUserID: string = invitedUser.getId()
        const getBoardData: BoardModel = await this.boardUseCases.get(
          formatedName
        )
        if (getBoardData.getModel() === null)
          response = boardDoesNotExists(formatedName)
        else {
          const getBoardOwner: IUser = (await getBoardData.getOwner()) as IUser
          const ownerID: string = getBoardOwner._id.toString()
          if (ownerID === owner) {
            const boardWithInvitedUser = await this.boardUseCases.inviteUser(
              formatedName,
              invitedUserID
            )
            response = userInvitedToBoard(
              boardWithInvitedUser.getModel(),
              invitedUser.getName()
            )
          } else response = notOwner()
        }
      }

      return response
    } catch (error) {
      return unexpectedError()
    }
  }
  async kickUser(
    board: string,
    email: string,
    owner: string
  ): Promise<IResponse> {
    const formatedName: string = board.replace(/-/g, " ")
    let response: IResponse

    try {
      const kickedUser = await this.userUseCases.getUserByEmail(email)
      if (kickedUser?.getId() === undefined) response = userDoesNotExists()
      else {
        const boardData = await this.boardUseCases.get(formatedName)
        if (boardData.getModel() === null)
          response = boardDoesNotExists(formatedName)
        else {
          const boardOwner = boardData.getOwner() as IUser
          const boardOwnerID = boardOwner._id.toString()
          if (owner !== boardOwnerID) response = notOwner()
          else {
            const boardWithoutKickedUser = await this.boardUseCases.kickUser(
              formatedName,
              kickedUser.getId()
            )
            response = userKickedFromBoard(
              boardWithoutKickedUser.getModel(),
              kickedUser.getName()
            )
          }
        }
      }
      return response
    } catch (error) {
      console.log(error)
      return unexpectedError()
    }
  }
}
