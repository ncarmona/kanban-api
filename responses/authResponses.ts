import { IUser } from "@interfaces/IUser"
import { IResponse } from "@core/routes/IResponse"

export function signupSuccessful(data: IUser): IResponse {
  return {
    data,
    message: "User created successfully",
    status_code: 200,
  }
}

export function invalidSignupEmail(data: unknown): IResponse {
  return {
    data,
    message: "Invalid email address format.",
    status_code: 500,
  }
}

export function emailAlreadyExists(): IResponse {
  return {
    data: {},
    message: "Email already exists.",
    status_code: 500,
  }
}

export function activationSuccessful(email: string): IResponse {
  return {
    data: {},
    message:
      "Account assigned with email " +
      email +
      " has been activated successfully.",
    status_code: 200,
  }
}

export function userAlreadyActivated(): IResponse {
  return {
    data: {},
    message: "User was activated already or it does not exists.",
    status_code: 404,
  }
}
