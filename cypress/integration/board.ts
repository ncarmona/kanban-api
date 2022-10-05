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
  it("Participants can access to board data")
  it("users who not are owner or participant can not access")
  it("Participants populated when retrieve board")
})
describe("Invite user", () => {
  const { email, password } = credentials
  const participant = { email: "participant@gmail.com", password: "123456" }

  beforeEach(() => {
    cy.session(participant, () => {
      cy.signup(participant.email, participant.password)
      cy.activateUser({ email: participant.email, activation_token })
      cy.signin(participant.email, participant.password)
      cy.updateUser("participant")
      cy.signout()
    })
    Cypress.session.clearAllSavedSessions()
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

  it("Add participant", () => {
    cy.request({
      method: "POST",
      url: "/board/" + boardNameURL + "/invite",
      body: { email: participant.email },
      failOnStatusCode: false,
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.body.status_code).to.equal(200)
      expect(response.body.message).to.equal(
        "User participant has been invited to the board"
      )
    })
  })
  it("participants array can have duplicated participants", () => {
    cy.request({
      method: "POST",
      url: "/board/" + boardNameURL + "/invite",
      body: { email: participant.email },
      failOnStatusCode: false,
    })
    cy.request({
      method: "POST",
      url: "/board/" + boardNameURL + "/invite",
      body: { email: participant.email },
      failOnStatusCode: false,
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.body.status_code).to.equal(200)
      expect(response.body.message).to.equal(
        "User participant has been invited to the board"
      )
      const numParticipants = new Array(
        response.body.data["participants"]
      ).flat().length
      expect(numParticipants).to.equal(1)
    })
  })
  it("user who does not exists can not be added as invited to board", () => {
    cy.request({
      method: "POST",
      url: "/board/" + boardNameURL + "/invite",
      body: { email: "potato" },
      failOnStatusCode: false,
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.body.status_code).to.equal(404)
      expect(response.body.message).to.equal("User does not exists.")
    })
  })
  it("Board must exists in order to add a participant", () => {
    cy.request({
      method: "POST",
      url: "/board/noboard/invite",
      body: { email: participant.email },
      failOnStatusCode: false,
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.body.status_code).to.equal(404)
      expect(response.body.message).to.equal("Board noboard does not exists")
    })
  })
  it("Only owner can add participant", () => {
    cy.session("participantAsOwner", () => {
      cy.signin(participant.email, participant.password)
    })
    cy.request({
      method: "POST",
      url: "/board/" + boardNameURL + "/invite",
      body: { email: participant.email },
      failOnStatusCode: false,
    }).then((response: Cypress.Response<IResponse>) => {
      expect(response.body.status_code).to.equal(401)
      expect(response.body.message).to.equal(
        "Only owner can perform this action"
      )
    })
  })
})
