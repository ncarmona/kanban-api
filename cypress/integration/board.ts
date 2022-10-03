import { IResponse } from "../../core/routes/IResponse"

const email = "noelcarmona@gmail.com"
const password = "123456"
const activation_token = "123456"
const credentials = { email, password }
const credentials2 = {
  email: "noelcarmona@fake.com",
  password: "123456",
}
const boardName = "Board name"
const boardNameURL = boardName.replace(" ", "-")

describe("Create board", () => {
  beforeEach(() => {
    cy.session(credentials, () => {
      const { email, password } = credentials
      cy.signup(email, password)
      cy.activateUser({ email, activation_token })
      cy.signin(email, password)
    })
  })
  afterEach(() => {
    cy.signout()
    cy.dropCollections()
  })
  it("Create board", () => {
    cy.createBoard("board").then((response: Cypress.Response<IResponse>) => {
      expect(response.body.status_code).to.equal(200)
      expect(response.body.message).to.equal("Board created successfully")
    })
  })
  it("Can not create a new board with an existent board name", () => {
    cy.createBoard("board").then((response: Cypress.Response<IResponse>) => {
      expect(response.body.status_code).to.equal(200)
      expect(response.body.message).to.equal("Board created successfully")
    })
    cy.createBoard("board").then((response: Cypress.Response<IResponse>) => {
      expect(response.body.status_code).to.equal(500)
      expect(response.body.message).to.equal("Board board already exists.")
    })
  })
  it("Board name is required in order to create it", () => {
    cy.createBoard().then((response: Cypress.Response<IResponse>) => {
      expect(response.body.status_code).to.equal(500)
      expect(response.body.message).to.equal(
        "Missing parameters. Passed parameters: . Required parameters: name"
      )
    })
  })
  it("Guest can not create boards", () => {
    cy.signout()
    cy.createBoard("board").then((response: Cypress.Response<IResponse>) => {
      expect(response.body.status_code).to.equal(401)
      expect(response.body.message).to.equal(
        "Guest can not perform this action."
      )
    })
  })
})

describe("Delete board", () => {
  beforeEach(() => {
    cy.session(credentials, () => {
      const { email, password } = credentials
      cy.signup(email, password)
      cy.activateUser({ email, activation_token })
      cy.signin(email, password)
      cy.createBoard(boardName)
    })
  })
  afterEach(() => {
    cy.signout()
    cy.dropCollections()
  })

  it("Delete board", () => {
    cy.deleteBoard(boardNameURL).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(200)
        expect(response.body.message).to.equal(
          "Board Board name has been deleted"
        )
      }
    )
  })
  it("Board name is required in order to delete board", () => {
    cy.deleteBoard().then((response: Cypress.Response<IResponse>) => {
      expect(response.body.status_code).to.equal(undefined)
      expect(response.body.message).to.equal(undefined)
    })
  })
  it("Guest users can perform this action", () => {
    cy.createBoard(boardName)
    cy.signout()
    cy.deleteBoard(boardNameURL).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(401)
        expect(response.body.message).to.equal(
          "Guest can not perform this action."
        )
      }
    )
  })
  it("Only owner can delete board", () => {
    const credentials2 = {
      email: "noelcarmona@fake.com",
      password: "123456",
    }
    cy.createBoard(boardName).then((response: Cypress.Response<IResponse>) => {
      expect(response.body.status_code).to.equal(200)
      expect(response.body.message).to.equal("Board created successfully")
    })

    cy.signout()
    cy.session(credentials2, () => {
      const { email, password } = credentials2
      cy.signup(email, password)
      cy.activateUser({ email, activation_token })
      cy.signin(email, password)
    })
    cy.deleteBoard(boardNameURL).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(401)
        expect(response.body.message).to.equal(
          "Only owner can perform this action"
        )
      }
    )
  })
})
describe("Update board", () => {
  beforeEach(() => {
    cy.session(credentials, () => {
      const { email, password } = credentials
      cy.signup(email, password)
      cy.activateUser({ email, activation_token })
      cy.signin(email, password)
    })
    cy.createBoard(boardName)
  })
  afterEach(() => {
    cy.signout()
    cy.dropCollections()
  })

  it("Update board", () => {
    cy.updateBoard(boardNameURL, boardName).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(200)
        expect(response.body.message).to.equal("Board updated successfully")
      }
    )
  })
  it("Board name is required in order to update board", () => {
    cy.updateBoard("", boardName).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(undefined)
        expect(response.body.message).to.equal(undefined)
      }
    )
  })
  it("Board new name is required in order to update board", () => {
    cy.updateBoard(boardNameURL).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(500)
        expect(response.body.message).to.equal(
          "Missing parameters. Passed parameters: . Required parameters: newName"
        )
      }
    )
  })
  it("Only owner can update board", () => {
    cy.signout()
    cy.session(credentials2, () => {
      const { email, password } = credentials2
      cy.signup(email, password)
      cy.activateUser({ email, activation_token })
      cy.signin(email, password)
    })
    cy.updateBoard(boardNameURL, boardName).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(401)
        expect(response.body.message).to.equal(
          "Only owner can perform this action"
        )
      }
    )
  })
})
describe("Disable board", () => {
  beforeEach(() => {
    cy.session(credentials, () => {
      const { email, password } = credentials
      cy.signup(email, password)
      cy.activateUser({ email, activation_token })
      cy.signin(email, password)
      cy.createBoard(boardName)
    })
    cy.createBoard(boardName)
  })
  afterEach(() => {
    cy.signout()
    cy.dropCollections()
  })

  it("Disable board", () => {
    cy.disableBoard(boardNameURL).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(200)
        expect(response.body.message).to.equal(
          "Board has been disabled successfully"
        )
      }
    )
  })
  it("Only owner can disable board", () => {
    cy.createBoard(boardName)
    cy.signout()
    cy.session(credentials2, () => {
      const { email, password } = credentials2
      cy.signup(email, password)
      cy.activateUser({ email, activation_token })
      cy.signin(email, password)
    })
    cy.disableBoard(boardNameURL).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(401)
        expect(response.body.message).to.equal(
          "Only owner can perform this action"
        )
      }
    )
  })
})
describe("Enable board", () => {
  beforeEach(() => {
    cy.session(credentials, () => {
      const { email, password } = credentials
      cy.signup(email, password)
      cy.activateUser({ email, activation_token })
      cy.signin(email, password)
    })
    cy.createBoard(boardName)
  })
  afterEach(() => {
    cy.signout()
    cy.dropCollections()
  })

  it("Enable board", () => {
    cy.enableBoard(boardNameURL).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(200)
        expect(response.body.message).to.equal(
          "Board has been enabled successfully"
        )
      }
    )
  })
  it("Only owner can enable board", () => {
    cy.createBoard(boardName)
    cy.signout()

    cy.session(credentials2, () => {
      const { email, password } = credentials2
      cy.signup(email, password)
      cy.activateUser({ email, activation_token })
      cy.signin(email, password)
    })
    cy.enableBoard(boardNameURL).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(401)
        expect(response.body.message).to.equal(
          "Only owner can perform this action"
        )
      }
    )
  })
})
describe("Get board", () => {
  beforeEach(() => {
    const { email, password } = credentials

    cy.session(credentials, () => {
      cy.signup(email, password)
      cy.activateUser({ email, activation_token })
      cy.signin(email, password)
    })
    cy.createBoard(boardName)
  })
  afterEach(() => {
    cy.signout()
    cy.dropCollections()
  })

  it("Get board", () => {
    cy.request({
      method: "GET",
      url: "/board/" + boardNameURL,
      failOnStatusCode: false,
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.body.status_code).to.equal(200)
      expect(response.body.message).to.equal("Board retrieved successfully")
    })
  })
  it("Board name must be passed in order to get board", () => {
    cy.request({
      method: "GET",
      url: "/board",
      failOnStatusCode: false,
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.body.status_code).to.equal(undefined)
      expect(response.body.message).to.equal(undefined)
    })
  })
})
