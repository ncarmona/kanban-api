import { IResponse } from "../../core/routes/IResponse"

const email = "noelcarmona@gmail.com"
const password = "123456"
const activation_token = "123456"
const credentials = { email, password }
const credentials2 = {
  email: "noelcarmona@fake.com",
  password: "123456",
}
const credentials3 = {
  email: "noelcarmona3@fake.com",
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
    cy.session(credentials2, () => {
      cy.signup(credentials2.email, credentials2.password)
      cy.signup(email, password)

      cy.activateUser({ email: email, activation_token })
      cy.activateUser({ email: credentials2.email, activation_token })

      cy.signin(credentials2.email, credentials2.password)
      cy.updateUser("participant username")
      cy.signout()

      cy.signin(email, password)
      cy.createBoard(boardName)
      cy.inviteToBoard(boardNameURL, credentials2.email)
    })
    Cypress.session.clearAllSavedSessions()
  })
  afterEach(() => {
    cy.signout()
    cy.dropCollections()
  })

  it("Get board", () => {
    cy.session("getBoard", () => {
      cy.signin(email, password)
      cy.getBoard(boardNameURL).then(
        (response: Cypress.Response<IResponse>) => {
          expect(response.body.message).to.equal("Board retrieved successfully")
          expect(response.body.status_code).to.equal(200)
        }
      )
    })
  })
  it("Board name must be passed in order to get board", () => {
    cy.getBoard("").then((response: Cypress.Response<IResponse>) => {
      expect(response.body.status_code).to.equal(undefined)
      expect(response.body.message).to.equal(undefined)
    })
  })
  it("Participants can access to board data", () => {
    cy.session("credentials2GetBoard", () => {
      cy.signin(credentials2.email, credentials2.password)
      cy.getBoard(boardNameURL).then(
        (response: Cypress.Response<IResponse>) => {
          expect(response.body.message).to.equal("Board retrieved successfully")
          expect(response.body.status_code).to.equal(200)
        }
      )
    })
  })
  it("Participants populated when retrieve board", () => {
    cy.session("participants are populated", () => {
      cy.signin(credentials2.email, credentials2.password)
      cy.getBoard(boardNameURL).then(
        (response: Cypress.Response<IResponse>) => {
          expect(response.body.message).to.equal("Board retrieved successfully")
          expect(response.body.status_code).to.equal(200)
          const participants = new Array(response.body.data["participants"])
          const firstParticipantEmail = participants[0][0]["name"]
          expect(firstParticipantEmail).to.equal("participant username")
        }
      )
    })
  })
  it("users who not are owner or participant can not access", () => {
    cy.session("credentials3", () => {
      cy.signup(credentials3.email, credentials3.password)
      cy.activateUser({ email: credentials3.email, activation_token })
      cy.signin(credentials3.email, credentials3.password)
      cy.getBoard(boardNameURL).then(
        (response: Cypress.Response<IResponse>) => {
          expect(response.body.message).to.equal(
            "Request was ok, but you do not have enough permissions to perfom this action"
          )
          expect(response.body.status_code).to.equal(405)
        }
      )
    })
  })
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
    cy.inviteToBoard(boardNameURL, participant.email).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(200)
        expect(response.body.message).to.equal(
          "User participant has been invited to the board"
        )
      }
    )
  })
  it("participants array can have duplicated participants", () => {
    cy.inviteToBoard(boardNameURL, participant.email)

    cy.inviteToBoard(boardNameURL, participant.email).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(200)
        expect(response.body.message).to.equal(
          "User participant has been invited to the board"
        )
        const numParticipants = new Array(
          response.body.data["participants"]
        ).flat().length
        expect(numParticipants).to.equal(1)
      }
    )
  })
  it("user who does not exists can not be added as invited to board", () => {
    cy.inviteToBoard(boardNameURL, "potato").then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(404)
        expect(response.body.message).to.equal("User does not exists.")
      }
    )
  })
  it("Board must exists in order to add a participant", () => {
    cy.inviteToBoard("noboard", participant.email).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(404)
        expect(response.body.message).to.equal("Board noboard does not exists")
      }
    )
  })
  it("Only owner can add participant", () => {
    cy.session("participantAsOwner", () => {
      cy.signin(participant.email, participant.password)
    })
    cy.inviteToBoard(boardNameURL, participant.email).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).to.equal(401)
        expect(response.body.message).to.equal(
          "Only owner can perform this action"
        )
      }
    )
  })
})

describe("Kick user from board", () => {
  beforeEach(() => {
    cy.session(credentials2, () => {
      cy.signup(credentials2.email, credentials2.password)
      cy.activateUser({ email: credentials2.email, activation_token })
      cy.signin(credentials2.email, credentials2.password)
      cy.updateUser("participant")
      cy.signout()
    })

    cy.session(credentials, () => {
      cy.signup(email, password)
      cy.activateUser({ email, activation_token })
      cy.signin(email, password)
      cy.updateUser("owner_user")
      cy.createBoard(boardName)
      cy.signout()
    })
    Cypress.session.clearAllSavedSessions()
  })
  afterEach(() => {
    cy.signout()
    cy.dropCollections()
  })

  it("Remove participant from board", () => {
    cy.signin(email, password)
    cy.inviteToBoard(boardNameURL, credentials2.email).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).equals(200)
        const numParticipants = new Array(
          response.body.data["participants"]
        ).flat().length
        expect(numParticipants).to.equal(1)
      }
    )
    cy.kickFromBoard(boardNameURL, credentials2.email).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).equals(200)
        const numParticipants = new Array(
          response.body.data["participants"]
        ).flat().length
        expect(numParticipants).to.equal(0)
      }
    )
  })
  it("Can not remove unexistent participant from board", () => {
    cy.signin(email, password)
    cy.kickFromBoard(boardNameURL, "potato").then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).equals(404)
        expect(response.body.message).equals("User does not exists.")
      }
    )
  })
  it("Participant can not be removed from unexistent board", () => {
    cy.signin(email, password)
    cy.kickFromBoard("potato", credentials2.email).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).equals(404)
        expect(response.body.message).equals("Board potato does not exists")
      }
    )
  })
  it("Only owner can remove a participant from board", () => {
    cy.signin(credentials2.email, credentials2.password)
    cy.kickFromBoard(boardNameURL, credentials2.email).then(
      (response: Cypress.Response<IResponse>) => {
        expect(response.body.status_code).equals(401)
        expect(response.body.message).equals(
          "Only owner can perform this action"
        )
      }
    )
  })
})
