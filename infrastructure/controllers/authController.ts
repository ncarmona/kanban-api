import { IResponse } from "../../core/routes/IResponse"
import {
  signupSuccessful,
  invalidSignupEmail,
  unexpectedError,
  emailAlreadyExists,
} from "../../responses/authResponses"
import { AuthRepository } from "../repositories/AuthRepository"
import { UserModel } from "../../domain/models/userModel/user.model"
import { IAuth } from "../../core/models/IAuth"
import { regexEmail } from "../../utils/regExpressions"
import { IUser } from "../../domain/interfaces/IUser"

export class AuthController {
  private readonly mongoDBRepository

  constructor() {
    this.mongoDBRepository = new AuthRepository()
  }

  async signup(auth: IAuth): Promise<IResponse> {
    if (!regexEmail(auth.email)) invalidSignupEmail({ email: auth.email })

    let response: IResponse

    try {
      const user: UserModel = await this.mongoDBRepository.signup(auth)
      const userObject: IUser = user.getModel()
      delete userObject.password
      response = signupSuccessful(userObject)
    } catch (error) {
      if (error === "Email already exists.") response = emailAlreadyExists()
      else response = unexpectedError()
    }

    return response
  }
}
