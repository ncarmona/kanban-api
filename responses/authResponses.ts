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

export function userDisabled(email: string): IResponse {
  return {
    data: {},
    message:
      "User with email " +
      email +
      " has been disabled. Contact with administration for further information.",
    status_code: 404,
  }
}

export function userSigninSuccessfully(data: IUser): IResponse {
  return {
    data,
    message: "User signin successfully.",
    status_code: 200,
  }
}

export function userDoesNotExists(): IResponse {
  return {
    data: {},
    message: "User does not exists.",
    status_code: 404,
  }
}

export function userHasBeenDisabled(): IResponse {
  return {
    data: {},
    message: "User has been disabled successfully.",
    status_code: 200,
  }
}

export function userHasBeenEnabled(): IResponse {
  return {
    data: {},
    message: "User has been enabled successfully.",
    status_code: 200,
  }
}
