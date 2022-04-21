import { ModelDataAccess } from "../../core/models/modelDataAccess"
import { ModelDeleteDisable } from "../../core/models/modelDeleteDisable"
import { Model } from "../../core/models/model"
import { IAuth } from "../../core/models/IAuth"

export interface IUser
  extends ModelDataAccess,
    ModelDeleteDisable,
    Model,
    IAuth {
  name: string
  photo: string
}
