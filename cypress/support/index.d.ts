/// <reference types="cypress" />

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  interface Chainable<Subject = any> {
    signup(email: string, password: string)
    signin(email: string, password: string)
    signout()
    dropCollections()
    disableUser()
    enableUser()
    deleteUser()
    updateUser(name: string)
    activateUser(qs: unknown)
    createBoard(name?: string): Cypress.Chainable<Cypress.Response<unknown>>
    deleteBoard(name?: string): Cypress.Chainable<Cypress.Response<unknown>>
    enableBoard(
      boardNameURL: string
    ): Cypress.Chainable<Cypress.Response<unknown>>
    disableBoard(
      boardNameURL: string
    ): Cypress.Chainable<Cypress.Response<unknown>>
    updateBoard(
      name: string,
      newName?
    ): Cypress.Chainable<Cypress.Response<unknown>>
  }
}
