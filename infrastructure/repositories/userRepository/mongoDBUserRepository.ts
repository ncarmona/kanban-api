import { IUser } from "../../../domain/interfaces/IUser"
import { UserModel } from "../../../domain/models/userModel/user.model"
import { UserRepository } from "./userRepository"
import { MongoDBConnector } from "../../../core/repository/connectors/MongoDBConnector"
import { mongoDBUser } from "../../../core/repository/MongoDB/Schemas/User"
import { FilterQuery, UpdateQuery, MongooseError } from "mongoose"
import { IConnector } from "../../../core/repository/connectors/IConnector"

export class MongoDBUserRepository implements UserRepository {
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
  async getUserData(_id: string): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      const deleted = false
      const filter: FilterQuery<unknown> = { _id, deleted }

      mongoDBUser
        .findById(filter)
        .select(this.hiddenFields)
        .then((u: IUser) => {
          u === null ? reject(null) : resolve(new UserModel(u))
        })
        .catch((e: MongooseError) => reject(e))
    })
  }
  async getUserByEmail(email: string): Promise<UserModel> {
    try {
      const deleted = false
      const filter: FilterQuery<unknown> = { email, deleted }
      const user = await mongoDBUser.findOne(filter)
      return new UserModel(user)
    } catch (error) {
      return error
    }
  }
}
