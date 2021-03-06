import { IAuth } from "@core/models/IAuth"
import { UserModel } from "@models/userModel/user.model"

export interface AuthRepository {
  signup(auth: IAuth): Promise<UserModel>
  userActivation(auth: IAuth): Promise<UserModel>
  signin(auth: IAuth): Promise<UserModel>
}
