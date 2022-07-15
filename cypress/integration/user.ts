import {} from "cypress"
import { IResponse } from "../../core/routes/IResponse"

describe("Disable user", () => {
  let email: string
  const password = "12344"
  beforeEach(() => {
    email = crypto.randomUUID() + "@gmail.com"
    Cypress.Cookies.preserveOnce("auth")
    cy.request({
      url: "https://localhost:5000/auth/signup",
      method: "POST",
      body: {
        email,
        password,
      },
    }).then(() => {
      cy.request({
        url: "https://localhost:5000/auth/signin",
        method: "GET",
        body: {
          email,
          password,
        },
      })
    })
  })

  afterEach(() => {
    cy.request({
      url: "https://localhost:5000/auth/signout",
      method: "POST",
      failOnStatusCode: false,
    }).then(() => {
      cy.request({
        url: "https://localhost:5000/test/drop-collections",
        method: "PUT",
      })
    })
  })
  it("Disable user", () => {
    cy.request({
      url: "https://localhost:5000/user/disable",
      method: "PUT",
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(200)
    })
  })
  it("Can not disable user without auth token.", () => {
    cy.request({
      url: "https://localhost:5000/auth/signout",
      method: "POST",
      failOnStatusCode: false,
    })

    cy.request({
      url: "https://localhost:5000/user/disable",
      method: "PUT",
      failOnStatusCode: false,
    }).then((response: Cypress.Response<IResponse>) => {
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
    cy.request({
      url: "https://localhost:5000/auth/signup",
      method: "POST",
      body: {
        email,
        password,
      },
    }).then(() => {
      cy.request({
        url: "https://localhost:5000/auth/signin",
        method: "GET",
        body: {
          email,
          password,
        },
      })
    })
  })

  afterEach(() => {
    cy.request({
      url: "https://localhost:5000/auth/signout",
      method: "POST",
      failOnStatusCode: false,
    }).then(() => {
      cy.request({
        url: "https://localhost:5000/test/drop-collections",
        method: "PUT",
      })
    })
  })

  it("Enable user", () => {
    cy.request({
      url: "https://localhost:5000/user/enable",
      method: "PUT",
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(200)
    })
  })
  it("Can not enable user without auth token.", () => {
    cy.request({
      url: "https://localhost:5000/auth/signout",
      method: "POST",
      failOnStatusCode: false,
    })

    cy.request({
      url: "https://localhost:5000/user/enable",
      method: "PUT",
      failOnStatusCode: false,
    }).then((response: Cypress.Response<IResponse>) => {
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
    cy.request({
      url: "https://localhost:5000/auth/signup",
      method: "POST",
      body: {
        email,
        password,
      },
    }).then(() => {
      cy.request({
        url: "https://localhost:5000/auth/signin",
        method: "GET",
        body: {
          email,
          password,
        },
      })
    })
  })

  afterEach(() => {
    cy.request({
      url: "https://localhost:5000/auth/signout",
      method: "POST",
      failOnStatusCode: false,
    }).then(() => {
      cy.request({
        url: "https://localhost:5000/test/drop-collections",
        method: "PUT",
      })
    })
  })

  it("Delete user", () => {
    cy.request({
      url: "https://localhost:5000/user",
      method: "DELETE",
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(200)
      expect(response.body.status_code).to.eq(200)
    })
  })
  it("Deleted user does not exists", () => {
    cy.request({
      url: "https://localhost:5000/user",
      method: "DELETE",
    }).then(() => {
      cy.request({
        url: "https://localhost:5000/user",
        method: "DELETE",
        failOnStatusCode: false,
      }).then((response: Cypress.Response<IResponse>) => {
        expect(response.status).to.eq(404)
        expect(response.body.status_code).to.eq(404)
      })
    })
  })
  it("Can not delete user without auth token", () => {
    cy.request({
      url: "https://localhost:5000/auth/signout",
      method: "POST",
      failOnStatusCode: false,
    }).then(() => {
      cy.request({
        url: "https://localhost:5000/user",
        method: "DELETE",
        failOnStatusCode: false,
      }).then((response: Cypress.Response<IResponse>) => {
        expect(response.status).to.eq(401)
        expect(response.body.status_code).to.eq(401)
      })
    })
  })
})
describe("Update user", () => {
  let email: string
  const password = "12344"
  beforeEach(() => {
    email = crypto.randomUUID() + "@gmail.com"
    Cypress.Cookies.preserveOnce("auth")
    cy.request({
      url: "https://localhost:5000/auth/signup",
      method: "POST",
      body: {
        email,
        password,
      },
    }).then(() => {
      cy.request({
        url: "https://localhost:5000/auth/signin",
        method: "GET",
        body: {
          email,
          password,
        },
      })
    })
  })

  afterEach(() => {
    cy.request({
      url: "https://localhost:5000/auth/signout",
      method: "POST",
      failOnStatusCode: false,
    }).then(() => {
      cy.request({
        url: "https://localhost:5000/test/drop-collections",
        method: "PUT",
      })
    })
  })
  it("Update photo", () => {
    const photo = "MyTestPhoto.png"
    cy.request({
      url: "https://localhost:5000/user",
      method: "PUT",
      body: {
        photo,
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(200)
      expect(response.body.data).to.haveOwnProperty("photo", photo)
    })
  })
  it("Update name", () => {
    const name = "Jane Doe"
    cy.request({
      url: "https://localhost:5000/user",
      method: "PUT",
      body: {
        name,
      },
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(200)
      expect(response.body.data).to.haveOwnProperty("name", name)
    })
  })
  it("Update name and photo", () => {
    const photo = "MyTestPhoto.png"
    const name = "Jane Doe"
    const body = {
      photo,
      name,
    }
    cy.request({
      url: "https://localhost:5000/user",
      method: "PUT",
      body,
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.status).to.eq(200)
      expect(response.body.data).to.haveOwnProperty("name", name)
      expect(response.body.data).to.haveOwnProperty("photo", photo)
    })
  })
  it("Can not update user without auth token", () => {
    const name = "Jane Doe"
    cy.request({
      url: "https://localhost:5000/auth/signout",
      method: "POST",
      failOnStatusCode: false,
    }).then(() => {
      cy.request({
        url: "https://localhost:5000/user",
        method: "PUT",
        body: {
          name,
        },
        failOnStatusCode: false,
      }).then((response: Cypress.Response<IResponse>) => {
        expect(response.status).to.eq(401)
      })
    })
  })
})
