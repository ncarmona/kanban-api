import { IUser } from "../../domain/interfaces/IUser"
import { IResponse } from "../../core/routes/IResponse"
import { signupSuccessful } from "../../responses/authResponses"

export class AuthController {
  signup(): IResponse {
    const data: IUser = {
      id: "",
      name: "Noel",
      photo: "photo.png",
      modified_at: new Date(),
      created_at: new Date(),
      deleted: false,
      disabled: false,
      email: "fake@mail.com",
      password: "",
    }
    const response: IResponse = signupSuccessful(data)

    return response
  }
}
