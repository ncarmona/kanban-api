import { IAuth } from "@core/models/IAuth"
import { IUser } from "@interfaces/IUser"
import { UserModel } from "@models/userModel/user.model"
import { AuthRepository } from "@repositories/authRepository"

export class AuthUseCases {
  private readonly database: AuthRepository

  constructor(database: AuthRepository) {
    this.database = database
  }

  signup(auth: IAuth): Promise<UserModel> {
    return this.database.signup(auth)
  }

  activate(auth: IAuth): Promise<UserModel> {
    return this.database.userActivation(auth)
  }

  signin(auth: IAuth): Promise<UserModel> {
    return this.database.signin(auth)
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
