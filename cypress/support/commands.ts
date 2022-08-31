Cypress.Commands.add("signup", (email: string, password: string) => {
  return cy.request({
    url: "/auth/signup",
    method: "POST",
    failOnStatusCode: false,
    body: {
      email,
      password,
    },
  })
})
Cypress.Commands.add("signin", (email, password) => {
  return cy.request({
    url: "/auth/signin",
    method: "POST",
    failOnStatusCode: false,
    body: {
      email,
      password,
    },
  })
})
Cypress.Commands.add("signout", () => {
  return cy.request({
    url: "/auth/signout",
    method: "POST",
    failOnStatusCode: false,
  })
})
Cypress.Commands.add("dropCollections", () => {
  return cy.request({
    url: "/test/drop-collections",
    method: "PUT",
  })
})
Cypress.Commands.add("disableUser", () => {
  return cy.request({
    url: "/user/disable",
    method: "PUT",
    failOnStatusCode: false,
  })
})
Cypress.Commands.add("enableUser", () => {
  return cy.request({
    url: "/user/enable",
    method: "PUT",
    failOnStatusCode: false,
  })
})
Cypress.Commands.add("deleteUser", () => {
  return cy.request({
    url: "/user",
    method: "DELETE",
    failOnStatusCode: false,
  })
})
Cypress.Commands.add("updateUser", (name: string) => {
  return cy.request({
    url: "/user",
    method: "PUT",
    body: {
      name,
    },
    failOnStatusCode: false,
  })
})

Cypress.Commands.add("activateUser", (qs: { string: string }) => {
  cy.request({
    method: "GET",
    url: "/auth/activation",
    failOnStatusCode: false,
    qs: qs,
  })
})
