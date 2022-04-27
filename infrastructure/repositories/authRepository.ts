import { IAuth } from "../../core/models/IAuth"
import { UserModel } from "../../domain/models/userModel/user.model"

export interface AuthRepository {
  signup(auth: IAuth): Promise<UserModel>
}
