import { Model } from "../../core/models/model"
import { ModelDeleteDisable } from "../../core/models/modelDeleteDisable"
import { ModelDataAccess } from "../../core/models/modelDataAccess"
import { IUser } from "./IUser"

export interface IBoard extends ModelDataAccess, ModelDeleteDisable, Model {
  name: string
  owner: IUser | string
  participants: IUser[] | string[]
}
