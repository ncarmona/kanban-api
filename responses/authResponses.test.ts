import {
  signupSuccessful,
  invalidSignupEmail,
  emailAlreadyExists,
  userAlreadyActivated,
  userDisabled,
} from "./authResponses"
import { IUser } from "../domain/interfaces/IUser"
import { IResponse } from "../core/routes/IResponse"

describe("Auth responses. SignupSuccessful", () => {
  const userData: IUser = {
    created_at: new Date(),
    modified_at: new Date(),
    deleted: false,
    disabled: true,
    email: "mail@fake.com",
  }
  const status_code = 200
  const createdOK = "User created successfully"
  let response: IResponse
  beforeAll(() => {
    response = signupSuccessful(userData)
  })
  it("data field must be the same as user data", () => {
    expect(response.data).toBe(userData)
  })
  it("Status code must be 200", () => {
    expect(response.status_code).toBe(status_code)
  })
  it("Message field must be correct", () => {
    expect(response.message).toStrictEqual(createdOK)
  })
})

describe("Auth responses. InvalidSignupEmail", () => {
  const data = { email: "fake" }
  const status_code = 500
  const message = "Invalid email address format."
  let response: IResponse

  beforeAll(() => {
    response = invalidSignupEmail(data)
  })

  it("status field must be 500", () => {
    expect(response.status_code).toBe(status_code)
  })
  it("Message must be 'invalid email address format.", () => {
    expect(response.message).toStrictEqual(message)
  })
  it("Data must be the same as pased by parameter.", () => {
    expect(response.data).toStrictEqual(data)
  })
})

describe("Auth responses. emailAlreadyExists", () => {
  const message = "Email already exists."
  const status_code = 500
  let response: IResponse

  beforeAll(() => {
    response = emailAlreadyExists()
  })

  it("Message must be 'Email already exists'", () => {
    expect(response.message).toStrictEqual(message)
  })

  it("Status field must be 500", () => {
    expect(response.status_code).toBe(status_code)
  })
})
describe("Auth responses. userAlreadyActivated", () => {
  const message = "User was activated already or it does not exists."
  const status_code = 404
  let response: IResponse

  beforeAll(() => {
    response = userAlreadyActivated()
  })

  it("Message must be 'Email already exists'", () => {
    expect(response.message).toStrictEqual(message)
  })

  it("Status field must be 404", () => {
    expect(response.status_code).toBe(status_code)
  })
})
describe("User disabled", () => {
  const email = "ncarm89@gmail.com"
  const message =
    "User with email " +
    email +
    " has been disabled. Contact with administration for further information."
  const status_code = 404
  let response: IResponse

  beforeAll(() => (response = userDisabled(email)))

  it("Message must test must contain the email", () => {
    expect(response.message).toStrictEqual(message)
  })
  it("Status field must be 404", () => {
    expect(response.status_code).toBe(status_code)
  })
})
