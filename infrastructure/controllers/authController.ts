import { IResponse } from "../../core/routes/IResponse"
import {
  signupSuccessful,
  invalidSignupEmail,
  unexpectedError,
  emailAlreadyExists,
} from "../../responses/authResponses"
import { MongoDBAuthRepository } from "../repositories/mongoDBauthRepository"
import { AuthRepository } from "../repositories/authRepository"
import { UserModel } from "../../domain/models/userModel/user.model"
import { IAuth } from "../../core/models/IAuth"
import { regexEmail } from "../../utils/regExpressions"
import { IUser } from "../../domain/interfaces/IUser"

export class AuthController {
  private readonly authRepository: AuthRepository

  constructor() {
    this.authRepository = new MongoDBAuthRepository()
  }

  async signup(auth: IAuth): Promise<IResponse> {
    if (!regexEmail(auth.email)) invalidSignupEmail({ email: auth.email })

    let response: IResponse

    try {
      const user: UserModel = await this.authRepository.signup(auth)
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
