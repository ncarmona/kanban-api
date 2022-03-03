import { ModelDataAccess } from "../../core/models/modelDataAccess"
import { ModelDeleteDisable } from "../../core/models/modelDeleteDisable"
import { Model } from "../../core/models/model"

export interface IUser extends ModelDataAccess, ModelDeleteDisable, Model {
  name: string
  email: string
  password: string
}
