import { IResponse } from "../../core/routes/IResponse"
import { IBoard } from "../../domain/interfaces/IBoard"
import {
  boardAlreadyExists,
  boardAlreadyExistsShowName,
  boardDeleted,
  boardDisabled,
  boardDoesNotExists,
  boardEnabled,
  createBoardSuccessful,
  notOwner,
  retrievedBoard,
  updatedBoardSucessfully,
} from "./boardResponses"

const board: IBoard = {
  _id: "0",
  created_at: new Date(),
  modified_at: new Date(),
  deleted: false,
  disabled: false,
  name: "Board name",
  owner: "111",
  participants: [],
}

it("Board responses. createBoardSuccessful", () => {
  const expectedStatus_code = 200
  const expectedMessage = "Board created successfully"
  const response: IResponse = createBoardSuccessful(board)
  const { data, message, status_code } = response

  expect(status_code).toStrictEqual(expectedStatus_code)
  expect(message).toStrictEqual(expectedMessage)
  expect(data).toStrictEqual(board)
})

it("BoardResponses. retrievedBoard", () => {
  const expectedStatus_code = 200
  const expectedMessage = "Board retrieved successfully"
  const response: IResponse = retrievedBoard(board)
  const { data, message, status_code } = response

  expect(status_code).toStrictEqual(expectedStatus_code)
  expect(message).toStrictEqual(expectedMessage)
  expect(data).toStrictEqual(board)
})

it("BoardResponses. boardAlreadyExistsShowName", () => {
  const expectedStatus_code = 500
  const expectedMessage = `Board ${board.name} already exists.`
  const response: IResponse = boardAlreadyExistsShowName(board.name)
  const { data, message, status_code } = response

  expect(status_code).toStrictEqual(expectedStatus_code)
  expect(message).toStrictEqual(expectedMessage)
  expect(data).toStrictEqual({})
})
it("BoardResponses. boardAlreadyExists exists", () => {
  const expectedStatus_code = 200
  const expectedMessage = "Board exists"
  const response: IResponse = boardAlreadyExists(true)
  const { data, message, status_code } = response

  expect(status_code).toStrictEqual(expectedStatus_code)
  expect(message).toStrictEqual(expectedMessage)
  expect(data).toStrictEqual({ exists: true })
})
it("BoardResponses. boardAlreadyExists dont exists", () => {
  const expectedStatus_code = 200
  const expectedMessage = "Board does not exists"
  const response: IResponse = boardAlreadyExists(false)
  const { data, message, status_code } = response

  expect(status_code).toStrictEqual(expectedStatus_code)
  expect(message).toStrictEqual(expectedMessage)
  expect(data).toStrictEqual({ exists: false })
})
it("BoardResponses. boardEnabled", () => {
  const expectedStatus_code = 200
  const expectedMessage = "Board has been enabled successfully"
  const response: IResponse = boardEnabled(board)
  const { data, message, status_code } = response

  expect(status_code).toStrictEqual(expectedStatus_code)
  expect(message).toStrictEqual(expectedMessage)
  expect(data).toStrictEqual(board)
})
it("BoardResponses. boardDisabled", () => {
  const expectedStatus_code = 200
  const expectedMessage = "Board has been disabled successfully"
  const response: IResponse = boardDisabled(board)
  const { data, message, status_code } = response

  expect(status_code).toStrictEqual(expectedStatus_code)
  expect(message).toStrictEqual(expectedMessage)
  expect(data).toStrictEqual(board)
})
it("BoardResponses. boardDeleted", () => {
  const expectedStatus_code = 200
  const expectedMessage = `Board ${board.name} has been deleted`
  const response: IResponse = boardDeleted(board)
  const { data, message, status_code } = response

  expect(status_code).toStrictEqual(expectedStatus_code)
  expect(message).toStrictEqual(expectedMessage)
  expect(data).toStrictEqual(board)
})
it("BoardResponses. boardDoesNotExists", () => {
  const expectedStatus_code = 404
  const expectedMessage = `Board ${board.name} does not exists`
  const response: IResponse = boardDoesNotExists(board.name)
  const { data, message, status_code } = response

  expect(status_code).toStrictEqual(expectedStatus_code)
  expect(message).toStrictEqual(expectedMessage)
  expect(data).toStrictEqual({})
})
it("BoardResponses. updatedBoardSucessfully", () => {
  const expectedStatus_code = 200
  const expectedMessage = "Board updated successfully"
  const response: IResponse = updatedBoardSucessfully(board)
  const { data, message, status_code } = response

  expect(status_code).toStrictEqual(expectedStatus_code)
  expect(message).toStrictEqual(expectedMessage)
  expect(data).toStrictEqual(board)
})
it("BoardResponses. notOwner", () => {
  const expectedStatus_code = 401
  const expectedMessage = "Only owner can perform this action"
  const response: IResponse = notOwner()
  const { data, message, status_code } = response

  expect(status_code).toStrictEqual(expectedStatus_code)
  expect(message).toStrictEqual(expectedMessage)
  expect(data).toStrictEqual({})
})
