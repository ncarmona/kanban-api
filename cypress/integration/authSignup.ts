import {} from "cypress"
import { IResponse } from "../../core/routes/IResponse"

describe("AuthSignup", () => {
  it("invalid parameters must display error", () => {
    const message =
      "Missing parameters. Passed parameters: emaile, password. Required parameters: email, password"
    cy.request({
      url: "http://localhost:5000/auth/signup",
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
      url: "http://localhost:5000/auth/signup",
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
      url: "http://localhost:5000/auth/signup",
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
    cy.request("POST", "http://localhost:5000/auth/signup", {
      email: "nonfake@mail.com",
      password: "12344",
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(200)
      expect(response.body.status_code).to.eq(200)

      expect(response.body.data).to.haveOwnProperty("_id")
      expect(response.body.data).to.haveOwnProperty("modified_at")
      expect(response.body.data).to.haveOwnProperty("created_at")
      expect(response.body.data).to.haveOwnProperty("email", "nonfake@mail.com")
      expect(response.body.data).to.haveOwnProperty("deleted", false)
      expect(response.body.data).to.haveOwnProperty("disabled", true)

      expect(response.body.message).to.eq(expectedMessage)
    })
  })
  it("Existing email display error", () => {
    const expectedMessage = "Email already exists."
    cy.request({
      url: "http://localhost:5000/auth/signup",
      method: "POST",
      failOnStatusCode: false,
      body: {
        email: "nonfake@mail.com",
        password: "12344",
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(500)
      expect(response.body.status_code).to.eq(500)
      expect(response.body.message).to.eq(expectedMessage)
    })
  })
})
