import { IAuth } from "@core/models/IAuth"
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
}
