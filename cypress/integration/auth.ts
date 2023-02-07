import {} from "cypress"
import { IResponse } from "../../core/routes/IResponse"
import {
  userDoesNotExists,
  userSigninSuccessfully,
} from "../../responses/authResponses"

describe("Signup user", () => {
  let email: string
  const password = "12344"
  beforeEach(() => {
    cy.request({
      url: "https://localhost:5000/test/drop-collections",
      method: "PUT",
    })
  })
  it("invalid parameters must display error", () => {
    const message =
      "Missing parameters. Passed parameters: emaile, password. Required parameters: email, password"
    cy.request({
      url: "https://localhost:5000/auth/signup",
      method: "POST",
      failOnStatusCode: false,
      body: {
        emaile: "nonfake@mail.com",
        password: "12344",
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(500)
      expect(response.body.status_code).to.eq(500)
      expect(response.body.message).to.eq(message)
    })
  })
  it("Missing email must display error", () => {
    const message =
      "Missing parameters. Passed parameters: password. Required parameters: email, password"
    cy.request({
      url: "https://localhost:5000/auth/signup",
      method: "POST",
      failOnStatusCode: false,
      body: {
        password: "12344",
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(500)
      expect(response.body.status_code).to.eq(500)
      expect(response.body.message).to.eq(message)
    })
  })
  it("Missing password must display error", () => {
    const message =
      "Missing parameters. Passed parameters: email. Required parameters: email, password"
    cy.request({
      url: "https://localhost:5000/auth/signup",
      method: "POST",
      failOnStatusCode: false,
      body: {
        email: "hello@noelcarmona.com",
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(500)
      expect(response.body.status_code).to.eq(500)
      expect(response.body.message).to.eq(message)
    })
  })
  it("Non existing email, email and password in the req must create user", () => {
    const expectedMessage = "User created successfully"
    cy.request("POST", "https://localhost:5000/auth/signup", {
      email: "ncarm89@gmail.com",
      password: "12344",
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(200)
      expect(response.body.status_code).to.eq(200)

      expect(response.body.data).to.haveOwnProperty("modified_at")
      expect(response.body.data).to.haveOwnProperty("created_at")
      expect(response.body.data).to.haveOwnProperty(
        "email",
        "ncarm89@gmail.com"
      )
      expect(response.body.data).to.haveOwnProperty("deleted", false)
      expect(response.body.data).to.haveOwnProperty("disabled", true)

      expect(response.body.message).to.eq(expectedMessage)
    })
    cy.request({
      url: "https://localhost:5000/test/drop-collections",
      method: "PUT",
    })
  })
  it("Existing email display error", () => {
    const expectedMessage = "Email already exists."
    email = crypto.randomUUID() + "@gmail.com"
    cy.request({
      url: "https://localhost:5000/auth/signup",
      method: "POST",
      body: {
        email,
        password,
      },
    })

    cy.request({
      url: "https://localhost:5000/auth/signup",
      method: "POST",
      failOnStatusCode: false,
      body: {
        email,
        password,
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.body.message).to.eq(expectedMessage)
      expect(response.body.status_code).to.eq(500)
      expect(response.status).to.eq(500)
    })
  })
})

describe("Activate account", () => {
  beforeEach(() => {
    cy.request({
      url: "https://localhost:5000/test/drop-collections",
      method: "PUT",
    })
  })

  it("invalid parameters must display error", () => {
    const message =
      "Missing parameters. Passed parameters: emaile, activation_token. Required parameters: email, activation_token"
    cy.request({
      method: "GET",
      url: "https://localhost:5000/auth/activation",
      failOnStatusCode: false,
      qs: {
        emaile: "ncarm89@gmail.com",
        activation_token: "123456",
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(500)
      expect(response.body.status_code).to.eq(500)
      expect(response.body.message).to.eq(message)
    })
  })
  it("Missing email parameter must display error", () => {
    const message =
      "Missing parameters. Passed parameters: activation_token. Required parameters: email, activation_token"
    cy.request({
      method: "GET",
      url: "https://localhost:5000/auth/activation",
      failOnStatusCode: false,
      qs: {
        activation_token: "123456",
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(500)
      expect(response.body.status_code).to.eq(500)
      expect(response.body.message).to.eq(message)
    })
  })
  it("Missing activation_token parameter must display error", () => {
    const message =
      "Missing parameters. Passed parameters: email. Required parameters: email, activation_token"
    cy.request({
      method: "GET",
      url: "https://localhost:5000/auth/activation",
      failOnStatusCode: false,
      qs: {
        email: "ncarm89@gmail.com",
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(500)
      expect(response.body.status_code).to.eq(500)
      expect(response.body.message).to.eq(message)
    })
  })
  it("Activate user with invalid token", () => {
    const message = "User was activated already or it does not exists."
    cy.request({
      method: "GET",
      url: "https://localhost:5000/auth/activation",
      failOnStatusCode: false,
      qs: {
        email: "ncarm89@gmail.com",
        activation_token: "----",
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(404)
      expect(response.body.status_code).to.eq(404)
      expect(response.body.message).to.eq(message)
    })
  })
  it("Activate user with invalid email", () => {
    const message = "User was activated already or it does not exists."
    cy.request({
      method: "GET",
      url: "https://localhost:5000/auth/activation",
      failOnStatusCode: false,
      qs: {
        email: "noelcarmona@gmail.com",
        activation_token: "123456",
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(404)
      expect(response.body.status_code).to.eq(404)
      expect(response.body.message).to.eq(message)
    })
  })
  it("Activate user", () => {
    const message =
      "Account assigned with email ncarm89@gmail.com has been activated successfully."
    const email = "ncarm89@gmail.com"
    const password = "12344"
    const activation_token = "123456"
    const body = {
      email,
      password,
    }
    cy.request({
      url: "https://localhost:5000/auth/signup",
      method: "POST",
      body,
    })

    cy.request({
      method: "GET",
      url: "https://localhost:5000/auth/activation",
      failOnStatusCode: false,
      qs: {
        email,
        activation_token,
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(200)
      expect(response.body.status_code).to.eq(200)
      expect(response.body.message).to.eq(message)
    })
  })
  it("Activate user whom was already activated", () => {
    const message = "User was activated already or it does not exists."
    cy.request({
      method: "GET",
      url: "https://localhost:5000/auth/activation",
      failOnStatusCode: false,
      qs: {
        email: "ncarm89@gmail.com",
        activation_token: "123456",
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.body.message).to.eq(message)
      expect(response.status).to.eq(404)
      expect(response.body.status_code).to.eq(404)
    })
  })
})
describe("Signin user", () => {
  beforeEach(() => {
    cy.request({
      url: "https://localhost:5000/test/drop-collections",
      method: "PUT",
    })
  })

  it("Invalid parameters must display error.", () => {
    const message =
      "Missing parameters. Passed parameters: email, activation_token. Required parameters: email, password"
    cy.request({
      method: "POST",
      url: "https://localhost:5000/auth/signin",
      failOnStatusCode: false,
      body: {
        email: "ncarm89@gmail.com",
        activation_token: "123456",
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(500)
      expect(response.body.status_code).to.eq(500)
      expect(response.body.message).to.eq(message)
    })
  })
  it("Missing parameter email.", () => {
    const message =
      "Missing parameters. Passed parameters: password. Required parameters: email, password"
    cy.request({
      method: "POST",
      url: "https://localhost:5000/auth/signin",
      failOnStatusCode: false,
      body: {
        password: "123456",
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(500)
      expect(response.body.status_code).to.eq(500)
      expect(response.body.message).to.eq(message)
    })
  })
  it("Missing parameter password.", () => {
    const message =
      "Missing parameters. Passed parameters: email. Required parameters: email, password"
    cy.request({
      method: "POST",
      url: "https://localhost:5000/auth/signin",
      failOnStatusCode: false,
      body: {
        email: "ncarm89@gmail.com",
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(500)
      expect(response.body.status_code).to.eq(500)
      expect(response.body.message).to.eq(message)
    })
  })
  it("User does not exists.", () => {
    const expectedResponse: IResponse = userDoesNotExists()
    expectedResponse.message
    cy.request({
      method: "POST",
      url: "https://localhost:5000/auth/signin",
      failOnStatusCode: false,
      body: {
        email: "ncarm89@gmail.com",
        password: "idk",
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(404)
      expect(response.body.status_code).to.eq(404)
      expect(response.body.message).to.eq(expectedResponse.message)
    })
  })
  it("User login successfully", () => {
    const expectedResponse: IResponse = userSigninSuccessfully({})
    const email = "ncarm89@gmail.com"
    const password = "12344"
    const activation_token = "123456"
    const body = { email, password }
    const qs = { email, activation_token }

    cy.request({
      url: "https://localhost:5000/auth/signup",
      method: "POST",
      failOnStatusCode: false,
      body,
    })

    cy.request({
      method: "GET",
      url: "https://localhost:5000/auth/activation",
      failOnStatusCode: false,
      qs,
    })

    cy.request({
      method: "POST",
      url: "https://localhost:5000/auth/signin",
      failOnStatusCode: false,
      body,
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(200)
      expect(response.body.status_code).to.eq(200)
      expect(response.body.message).to.eq(expectedResponse.message)
      expect(response.body.data).to.haveOwnProperty("created_at")
      expect(response.body.data).to.not.haveOwnProperty("deleted", false)
      expect(response.body.data).to.not.haveOwnProperty("disabled", false)
      expect(response.body.data).to.haveOwnProperty("modified_at")
      expect(response.body.data).to.not.haveOwnProperty("password")
      expect(response.body.data).to.not.haveOwnProperty("_id")
      expect(response.body.data).to.haveOwnProperty("email", email)
      expect(cy.getCookie("auth")).to.not.null
    })
  })
})
