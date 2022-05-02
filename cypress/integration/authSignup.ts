import {} from "cypress"
import { IResponse } from "../../core/routes/IResponse"

describe("AuthSignup", () => {
  it.skip("invalid parameters must display error", () => {
    cy.visit("https://example.cypress.io")
  })
  it.skip("Missing email must display error", () => {
    cy.visit("https://example.cypress.io")
  })
  it.skip("Missing password must display error", () => {
    cy.visit("https://example.cypress.io")
  })
  it.skip("Existing email display error", () => {
    cy.visit("https://example.cypress.io")
  })
  it.skip("Non existing email, email and password in the req must create user", () => {
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
})
