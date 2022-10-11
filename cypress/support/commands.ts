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
Cypress.Commands.add("createBoard", (name?: string) => {
  return cy.request({
    url: "/board",
    method: "POST",
    body: { name },
    failOnStatusCode: false,
  })
})
Cypress.Commands.add("deleteBoard", (name?: string) => {
  cy.request({
    url: "/board/" + (name ?? ""),
    method: "DELETE",
    failOnStatusCode: false,
  })
})
Cypress.Commands.add("updateBoard", (name: string, newName?: string) => {
  const body = newName === undefined ? {} : { newName }
  cy.request({
    url: "/board/" + (name.replace(" ", "-") ?? ""),
    method: "PUT",
    body,
    failOnStatusCode: false,
  })
})

Cypress.Commands.add("enableBoard", (boardNameURL: string) => {
  return cy.request({
    url: "/board/" + boardNameURL + "/enable",
    method: "PUT",
    failOnStatusCode: false,
  })
})
Cypress.Commands.add("disableBoard", (boardNameURL: string) => {
  return cy.request({
    url: "/board/" + boardNameURL + "/disable",
    method: "PUT",
    failOnStatusCode: false,
  })
})
Cypress.Commands.add("inviteToBoard", (boardNameURL: string, email: string) => {
  return cy.request({
    method: "POST",
    url: "/board/" + boardNameURL + "/invite",
    body: { email },
    failOnStatusCode: false,
  })
})
Cypress.Commands.add("kickFromBoard", (boardNameURL: string, email: string) => {
  return cy.request({
    url: "/board/" + boardNameURL + "/kick",
    method: "DELETE",
    body: { email },
    failOnStatusCode: false,
  })
})
Cypress.Commands.add("getBoard", (boardNameURL: string) => {
  return cy.request({
    method: "GET",
    url: "/board/" + boardNameURL,
    failOnStatusCode: false,
  })
})
