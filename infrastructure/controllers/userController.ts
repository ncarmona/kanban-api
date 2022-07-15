import { IResponse } from "@core/routes/IResponse"
import {
  userDoesNotExists,
  userHasBeenDisabled,
  userHasBeenEnabled,
  userHasBeenDeleted,
  userHasBeenUpdated,
} from "@responses/authResponses"
import { UserUseCases } from "@usecases/userUseCases"
import { MongoDBUserRepository } from "@repositories/userRepository/mongoDBUserRepository"
import { UserRepository } from "@repositories/userRepository/userRepository"
import { UserModel } from "@models/userModel/user.model"
import { unexpectedError } from "@core/responses/responses"
import { IUser } from "@interfaces/IUser"

export class UserController {
  private readonly userUseCases: UserUseCases
  private readonly mongoDBUserRepository: UserRepository

  constructor() {
    this.mongoDBUserRepository = new MongoDBUserRepository()
    this.userUseCases = new UserUseCases(this.mongoDBUserRepository)
  }

  async disable(id: string): Promise<IResponse> {
    let response: IResponse

    try {
      const user: UserModel = await this.userUseCases.disable(id)
      response = user.getDisabled() ? userHasBeenDisabled() : unexpectedError()
    } catch (error) {
      response = error === null ? userDoesNotExists() : unexpectedError()
    }

    return response
  }

  async enable(id: string): Promise<IResponse> {
    let response: IResponse

    try {
      const user: UserModel = await this.userUseCases.enable(id)
      response = !user.getDisabled() ? userHasBeenEnabled() : unexpectedError()
    } catch (error) {
      response = error === null ? userDoesNotExists() : unexpectedError()
    }

    return response
  }

  async delete(id: string): Promise<IResponse> {
    let response: IResponse

    try {
      const user: UserModel = await this.userUseCases.delete(id)
      console.log(user)
      response = user.getDeleted() ? userHasBeenDeleted() : unexpectedError()
    } catch (error) {
      response = error === null ? userDoesNotExists() : unexpectedError()
    }

    return response
  }

  async update(user: IUser): Promise<IResponse> {
    let response: IResponse
    try {
      const userModel: UserModel = await this.userUseCases.update(user)
      response = !userModel.getDisabled()
        ? userHasBeenUpdated(userModel.getModel())
        : unexpectedError()
    } catch (error) {
      response = error === null ? userDoesNotExists() : unexpectedError()
    }

    return response
  }
}
