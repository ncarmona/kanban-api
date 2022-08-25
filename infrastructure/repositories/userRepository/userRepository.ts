import { IUser } from "../../../domain/interfaces/IUser"
import { UserModel } from "../../../domain/models/userModel/user.model"

export interface UserRepository {
  removePermanently(id: string): Promise<UserModel>
  toggleDisable(id: string, disabled: boolean): Promise<UserModel>
  delete(id: string): Promise<UserModel>
  update(user: IUser): Promise<UserModel>
  getUserData(_id: string): Promise<UserModel>
}
