import { IBoard } from "../../interfaces/IBoard"
import { IUser } from "../../interfaces/IUser"

export class BoardModel {
  private _board: IBoard

  constructor(board: IBoard) {
    this._board = {
      created_at: board.created_at,
      deleted: board.deleted,
      disabled: board.disabled,
      modified_at: board.modified_at,
      _id: board._id,
      name: board.name,
      owner: board.owner,
      participants: board.participants,
    }
  }

  public getId(): string | undefined {
    return this._board._id
  }
  public setId(_id: string) {
    this._board._id = _id
  }

  public getName(): string {
    return this._board.name
  }
  public setName(name: string) {
    this._board.name = name
  }

  public getDisabled(): boolean {
    return this._board.disabled
  }
  public setDisabled(disabled: boolean) {
    this._board.disabled = disabled
  }

  public getDeleted(): boolean {
    return this._board.deleted
  }
  public setDeleted(deleted: boolean) {
    this._board.deleted = deleted
  }

  public getModifiedAt(): Date {
    return this._board.modified_at
  }
  public setModifiedAt(date: Date) {
    this._board.modified_at = new Date(date)
  }

  public getCreatedAt(): Date {
    return this._board.created_at
  }
  public setCreatedAt(date: Date) {
    this._board.created_at = new Date(date)
  }

  public getOwner(): IUser | string {
    return this._board.owner
  }
  public setOwner(owner: IUser | string) {
    this._board.owner = owner
  }

  public getParticipants(): IUser[] | string[] {
    return this._board.participants
  }
  public setParticipants(participants: IUser[] | string[]) {
    this._board.participants = participants
  }

  public getModel(): IBoard {
    return this._board
  }
}
