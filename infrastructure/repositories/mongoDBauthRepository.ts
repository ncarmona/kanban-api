import { IUser } from "@interfaces/IUser"
import { UserModel } from "@models/userModel/user.model"
import { IConnector } from "@core/repository/connectors/IConnector"
import { MongoDBConnector } from "@core/repository/connectors/MongoDBConnector"
import { IAuth } from "@core/models/IAuth"
import { mongoDBUser } from "@core/repository/MongoDB/Schemas/User"
import { MongooseError } from "mongoose"
import { AuthRepository } from "@repositories/authRepository"
import { FilterQuery, UpdateQuery } from "mongoose"
export class MongoDBAuthRepository implements AuthRepository {
  private readonly connector: IConnector
  private readonly hiddenFields: string[]
  constructor() {
    this.connector = new MongoDBConnector()
    this.connector.link()
    this.hiddenFields = [
      "-_id",
      "-password",
      "-deleted",
      "-activation_token",
      "-disabled",
    ]
  }

  async signup(auth: IAuth): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      const { email, password } = auth
      const userData: IUser = {
        modified_at: new Date(),
        created_at: new Date(),
        deleted: false,
        disabled: true,
        email,
        password,
      }

      mongoDBUser
        .create(userData)
        .then((u) => resolve(new UserModel(u)))
        .catch((e: MongooseError) => {
          const { message } = e
          if (message.startsWith("E11000")) reject("Email already exists.")
          reject(e.message)
        })
    })
  }

  async userActivation(auth: IAuth): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      const { email, activation_token } = auth
      mongoDBUser
        .findOneAndUpdate(
          { email, activation_token },
          { disabled: false, $unset: { activation_token: 1 } }
        )
        .then((u) => {
          u === null
            ? reject("User already activated")
            : resolve(new UserModel(u))
        })
        .catch((e: MongooseError) => reject(e))
    })
  }

  async signin(auth: IAuth): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      const user: IUser = auth as IUser
      user.deleted = false
      const filter: FilterQuery<IUser> = user
      mongoDBUser
        .findOne(filter)
        .select(this.hiddenFields)
        .then((u: IUser) =>
          u === null ? reject(null) : resolve(new UserModel(u))
        )
        .catch((e: MongooseError) => reject(e))
    })
  }

  async removePermanently(id: string): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      mongoDBUser
        .findByIdAndDelete(id)
        .then((u: IUser) => {
          u === null ? reject(null) : resolve(new UserModel(u))
        })
        .catch((e: MongooseError) => reject(e))
    })
  }

  async toggleDisable(id: string, disabled: boolean): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      const filter: FilterQuery<unknown> = { _id: id, deleted: false }
      const modified_at: Date = new Date()
      const update: UpdateQuery<unknown> = { disabled, modified_at }
      mongoDBUser
        .findOneAndUpdate(filter, update, { new: true })
        .then((u: IUser) => {
          u === null ? reject(null) : resolve(new UserModel(u))
        })
        .catch((e: MongooseError) => reject(e))
    })
  }
  async delete(id: string): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      const filter: FilterQuery<unknown> = { _id: id, deleted: false }
      const modified_at: Date = new Date()
      const update: UpdateQuery<unknown> = { deleted: true, modified_at }
      mongoDBUser
        .findOneAndUpdate(filter, update, { new: true })
        .then((u: IUser) => {
          u === null ? reject(null) : resolve(new UserModel(u))
        })
        .catch((e: MongooseError) => reject(e))
    })
  }
  async update(user: IUser): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      const { _id, photo, name } = user
      const deleted = false
      const filter: FilterQuery<unknown> = { _id, deleted }
      const modified_at: Date = new Date()
      const update: UpdateQuery<unknown> = { name, photo, modified_at }

      mongoDBUser
        .findOneAndUpdate(filter, update, { new: true })
        .select(this.hiddenFields)
        .then((u: IUser) => {
          u === null ? reject(null) : resolve(new UserModel(u))
        })
        .catch((e: MongooseError) => reject(e))
    })
  }
}
