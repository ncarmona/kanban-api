import { UserRepository } from "@repositories/userRepository/userRepository"
import { UserModel } from "@models/userModel/user.model"
import { IUser } from "@interfaces/IUser"

export class UserUseCases {
  private readonly database: UserRepository

  constructor(database: UserRepository) {
    this.database = database
  }

  disable(id: string): Promise<UserModel> {
    return this.database.toggleDisable(id, true)
  }

  enable(id: string): Promise<UserModel> {
    return this.database.toggleDisable(id, false)
  }

  delete(id: string): Promise<UserModel> {
    return this.database.delete(id)
  }

  update(user: IUser): Promise<UserModel> {
    return this.database.update(user)
  }
}
