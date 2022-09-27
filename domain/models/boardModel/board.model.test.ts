import { IBoard } from "../../interfaces/IBoard"
import { IUser } from "../../interfaces/IUser"
import { BoardModel } from "./board.model"

describe("Board model", () => {
  let boardModel: BoardModel
  const board: IBoard = {
    name: "My board",
    owner: "6332b2676c9149fdca21390c",
    created_at: new Date(),
    modified_at: new Date(),
    deleted: false,
    disabled: false,
  }
  const user: IUser = {
    name: "My username",
    photo: "photoURL",
    created_at: new Date(),
    modified_at: new Date(),
    deleted: false,
    disabled: false,
    email: "fakemail@mail.com",
  }

  const newUser: IUser = {
    name: "My username",
    photo: "photoURL",
    created_at: new Date(),
    modified_at: new Date(),
    deleted: false,
    disabled: false,
    email: "fakemail@mail.com",
  }

  beforeEach(() => (boardModel = new BoardModel(board)))

  it("Board without ID should no return board with ID", () => {
    const boardWithoutID: IBoard = { ...board }
    delete boardWithoutID._id
    const boardModelWithoutID = new BoardModel(boardWithoutID)
    const boardID = boardModelWithoutID.getId()

    expect(boardID).toBeUndefined()
  })
  it("Set a new board id", () => {
    const expectedID = "2"
    boardModel.setId(expectedID)

    expect(boardModel.getId()).toBe(expectedID)
  })
  it("Board name must be the same in the model and the IBoard", () => {
    expect(boardModel.getName()).toStrictEqual(board.name)
  })
  it("Board name must be assigned with setName", () => {
    const name = "board2"
    boardModel.setName(name)

    expect(boardModel.getName()).toStrictEqual(name)
  })
  it("Disabled must be the same in the model and the IBoard", () => {
    expect(boardModel.getDisabled()).toStrictEqual(board.disabled)
  })
  it("Board disabled must be assigned with setDisabled", () => {
    const disabled = true
    boardModel.setDisabled(disabled)

    expect(boardModel.getDisabled()).toStrictEqual(disabled)
  })

  it("Deleted must be the same in the model and the IBoard", () => {
    expect(boardModel.getDeleted()).toStrictEqual(board.deleted)
  })
  it("Board deleted must be assigned with setDeleted", () => {
    const deleted = true
    boardModel.setDeleted(deleted)

    expect(boardModel.getDeleted()).toStrictEqual(deleted)
  })
  it("Modified_at must be the same in the model and the IBoard", () => {
    expect(boardModel.getModifiedAt()).toStrictEqual(board.modified_at)
  })
  it("Board modified_at must be assigned with setModifiedAt", () => {
    const modified_at = new Date()
    boardModel.setModifiedAt(modified_at)

    expect(boardModel.getModifiedAt()).toStrictEqual(modified_at)
  })

  it("Created_at must be the same in the model and the IBoard", () => {
    expect(boardModel.getCreatedAt()).toStrictEqual(board.created_at)
  })
  it("Board created_at must be assigned with setCreatedAt", () => {
    const created_at = new Date()
    boardModel.setCreatedAt(created_at)

    expect(boardModel.getCreatedAt()).toStrictEqual(created_at)
  })
  it("Get the owned as string", () => {
    const expectedOwner = board.owner
    expect(boardModel.getOwner()).toStrictEqual(expectedOwner)
  })
  it("Set owner as string", () => {
    const expectedOwner = "6332b2676c9149fdcaffffff"
    boardModel.setOwner(expectedOwner)

    expect(boardModel.getOwner()).toStrictEqual(expectedOwner)
  })
  it("Get the owned as User", () => {
    boardModel.setOwner(user)
    const boardOwner = boardModel.getOwner() as IUser

    expect(boardOwner).toMatchObject(user)
  })
  it("Set owner as User", () => {
    boardModel.setOwner(user)
    let boardOwner = boardModel.getOwner() as IUser

    expect(boardOwner).toMatchObject(user)

    boardModel.setOwner(newUser)
    boardOwner = boardModel.getOwner() as IUser

    expect(boardOwner).toMatchObject(newUser)
  })
})
