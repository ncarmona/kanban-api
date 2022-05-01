import { IResponse } from "@core/routes/IResponse"
import {
  signupSuccessful,
  invalidSignupEmail,
  emailAlreadyExists,
} from "@responses/authResponses"
import { unexpectedError } from "@core/responses/responses"
import { MongoDBAuthRepository } from "@repositories/mongoDBauthRepository"
import { AuthRepository } from "@repositories/authRepository"
import { UserModel } from "@models/userModel/user.model"
import { IAuth } from "@core/models/IAuth"
import { regexEmail } from "@utils/regExpressions"
import { IUser } from "@interfaces/IUser"
import { AuthUseCases } from "@usecases/authUseCases"

export class AuthController {
  private readonly authUseCases: AuthUseCases
  private readonly mongoDBAuthRepository: AuthRepository

  constructor() {
    this.mongoDBAuthRepository = new MongoDBAuthRepository()
    this.authUseCases = new AuthUseCases(this.mongoDBAuthRepository)
  }

  async signup(auth: IAuth): Promise<IResponse> {
    if (!regexEmail(auth.email)) invalidSignupEmail({ email: auth.email })

    let response: IResponse

    try {
      const user: UserModel = await this.authUseCases.signup(auth)
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
