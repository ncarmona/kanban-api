/// <reference types="cypress" />

declare namespace Cypress {
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
  }
}
