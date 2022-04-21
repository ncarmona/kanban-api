import { IResponse } from "../core/routes/IResponse"

export function signupSuccessful(data: unknown): IResponse {
  return {
    data,
    message: "User created successfully",
    status_code: 200,
  }
}
