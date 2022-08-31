// import {} from "cypress"
import { IResponse } from "../../core/routes/IResponse"

describe("Disable user", () => {
  let email: string
  const password = "12344"
  beforeEach(() => {
    email = crypto.randomUUID() + "@gmail.com"
    Cypress.Cookies.preserveOnce("auth")
    cy.signup(email, password)
    cy.signin(email, password)
  })
  afterEach(() => {
    cy.signout()
    cy.dropCollections()
  })
  it("Disable user", () => {
    cy.disableUser().then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(200)
    })
  })
  it("Can not disable user without auth token.", () => {
    cy.signout()

    cy.disableUser().then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(401)
      expect(response.body.message).to.eq("Guest can not perform this action.")
      expect(response.body.status_code).to.eq(401)
    })
  })
})
describe("Enable user", () => {
  let email: string
  const password = "12344"
  beforeEach(() => {
    email = crypto.randomUUID() + "@gmail.com"
    Cypress.Cookies.preserveOnce("auth")
    cy.signup(email, password)
    cy.signin(email, password)
  })

  afterEach(() => {
    cy.signout()
    cy.dropCollections()
  })

  it("Enable user", () => {
    cy.enableUser().then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(200)
    })
  })
  it("Can not enable user without auth token.", () => {
    cy.signout()

    cy.enableUser().then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(401)
      expect(response.body.message).to.eq("Guest can not perform this action.")
      expect(response.body.status_code).to.eq(401)
    })
  })
})
describe("Delete user", () => {
  let email: string
  const password = "12344"
  beforeEach(() => {
    email = crypto.randomUUID() + "@gmail.com"
    Cypress.Cookies.preserveOnce("auth")
    cy.signup(email, password)
    cy.signin(email, password)
  })

  afterEach(() => {
    cy.signout()
    cy.dropCollections()
  })

  it("Delete user", () => {
    cy.deleteUser().then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(200)
      expect(response.body.status_code).to.eq(200)
    })
  })
  it("Deleted user does not exists", () => {
    cy.deleteUser()
    cy.deleteUser().then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(404)
      expect(response.body.status_code).to.eq(404)
    })
  })
  it("Can not delete user without auth token", () => {
    cy.signout()
    cy.deleteUser().then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(401)
      expect(response.body.status_code).to.eq(401)
    })
  })
})
describe("Update user", () => {
  let email: string
  const password = "12344"
  beforeEach(() => {
    email = crypto.randomUUID() + "@gmail.com"
    Cypress.Cookies.preserveOnce("auth")
    cy.signup(email, password)
    cy.signin(email, password)
  })

  afterEach(() => {
    cy.signout()
    cy.dropCollections()
  })
  it("Update photo REVIEW", () => {
    const photo = "MyTestPhoto.jpeg"
    cy.fixture(photo)
      .then(Cypress.Blob.base64StringToBlob)
      .then((file) => {
        const form = new FormData()
        form.set("photo", file, photo)
        cy.request({
          method: "PUT",
          url: "https://localhost:5000/user",
          body: form,
        }).then((response: Cypress.Response<IResponse>) => {
          expect(response.status).to.eq(200)
        })
      })
  })
  it("Update name", () => {
    const name = "Jane Doe"
    cy.updateUser(name).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(200)
      expect(response.body.data).to.haveOwnProperty("name", name)
    })
  })
  it("Update name and photo", () => {
    const photo = "MyTestPhoto.jpeg"
    const name = "Jane Doe"
    cy.fixture(photo)
      .then(Cypress.Blob.base64StringToBlob)
      .then((file) => {
        const form = new FormData()
        form.set("photo", file, photo)
        form.set("name", name)
        cy.request({
          method: "PUT",
          url: "https://localhost:5000/user",
          body: form,
        }).then((response: Cypress.Response<IResponse>) => {
          expect(response.status).to.eq(200)
        })
      })
  })
  it("Can not update user without auth token", () => {
    const name = "Jane Doe"
    cy.signout()
    cy.updateUser(name).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(401)
    })
  })
})
