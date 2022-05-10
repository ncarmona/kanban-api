import { IResponse } from "@core/routes/IResponse"
import {
  signupSuccessful,
  invalidSignupEmail,
  emailAlreadyExists,
  activationSuccessful,
  userAlreadyActivated,
  userDisabled,
  userSigninSuccessfully,
  userDoesNotExists,
  userHasBeenDisabled,
  userHasBeenEnabled,
} from "@responses/authResponses"
import { unexpectedError } from "@core/responses/responses"
import { MongoDBAuthRepository } from "@repositories/mongoDBauthRepository"
import { AuthRepository } from "@repositories/authRepository"
import { UserModel } from "@models/userModel/user.model"
import { IAuth } from "@core/models/IAuth"
import { regexEmail } from "@utils/regExpressions"
import { IUser } from "@interfaces/IUser"
import { AuthUseCases } from "@usecases/authUseCases"
import { send } from "@utils/mail"
import { Environments, environmentIs } from "@utils/environment"
import Mail from "nodemailer/lib/mailer"

export class AuthController {
  private readonly authUseCases: AuthUseCases
  private readonly mongoDBAuthRepository: AuthRepository

  constructor() {
    this.mongoDBAuthRepository = new MongoDBAuthRepository()
    this.authUseCases = new AuthUseCases(this.mongoDBAuthRepository)
  }

  //TODO: ActivationURL must be generated using environment server url.
  private async sendActivationEmail(user: IUser) {
    const activationURL =
      "https://localhost:5000/auth/activation?email=" +
      user.email +
      "&activation_token=" +
      user.activation_token
    const activationLink = "<a href=" + activationURL + ">activate</a>"
    const html =
      "In order to use the kanban app you must activate our account with the following link: " +
      activationLink
    const mailBody: Mail.Options = {
      to: user.email,
      subject: "Kanban activation email",
      html,
    }
    await send(mailBody)
  }
  async signup(auth: IAuth): Promise<IResponse> {
    if (!regexEmail(auth.email)) invalidSignupEmail({ email: auth.email })

    let response: IResponse

    try {
      const user: UserModel = await this.authUseCases.signup(auth)
      const userObject: IUser = user.getModel()
      if (environmentIs(Environments.PROD)) this.sendActivationEmail(userObject)

      delete userObject.password
      delete userObject.activation_token
      delete userObject._id
      response = signupSuccessful(userObject)
    } catch (error) {
      if (error === "Email already exists.") response = emailAlreadyExists()
      else response = unexpectedError()
    }

    return response
  }
  async activation(auth: IAuth): Promise<IResponse> {
    let response: IResponse

    try {
      const user: UserModel = await this.authUseCases.activate(auth)
      response = activationSuccessful(user.getEmail())
    } catch (error) {
      if (error === "User already activated") response = userAlreadyActivated()
      else response = unexpectedError()
    }
    return response
  }
  async signin(auth: IAuth): Promise<IResponse> {
    let response: IResponse

    try {
      const user: UserModel = await this.authUseCases.signin(auth)
      response = user.getDisabled()
        ? userDisabled(user.getEmail())
        : userSigninSuccessfully(user.getModel())
    } catch (error) {
      console.log(error)
      if (error === null) response = userDoesNotExists()
    }
    return response
  }
  async disable(id: string): Promise<IResponse> {
    let response: IResponse

    try {
      const user: UserModel = await this.authUseCases.disable(id)
      response = user.getDisabled() ? userHasBeenDisabled() : unexpectedError()
    } catch (error) {
      response = error === null ? userDoesNotExists() : unexpectedError()
    }

    return response
  }
  async enable(id: string): Promise<IResponse> {
    let response: IResponse

    try {
      const user: UserModel = await this.authUseCases.enable(id)
      response = !user.getDisabled() ? userHasBeenEnabled() : unexpectedError()
    } catch (error) {
      response = error === null ? userDoesNotExists() : unexpectedError()
    }

    return response
  }
}
