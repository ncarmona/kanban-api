import { IUser } from "../../interfaces/IUser"

export class UserModel {
  private _user: IUser

  constructor(user: IUser) {
    this._user = { ...user }
  }

  public getID(): string | undefined {
    return this._user.id
  }
  public setID(id: string) {
    this._user.id = id
  }

  public getName(): string {
    return this._user.name
  }
  public setName(name: string) {
    this._user.name = name
  }

  public getPassword(): string {
    return this._user.password
  }
  public setPassword(password: string) {
    this._user.password = password
  }

  public getEmail(): string {
    return this._user.email
  }
  public setEmail(email: string) {
    this._user.email = email
  }

  public getDisabled(): boolean {
    return this._user.disabled
  }
  public setDisabled(disabled: boolean) {
    this._user.disabled = disabled
  }

  public getDeleted(): boolean {
    return this._user.deleted
  }
  public setDeleted(deleted: boolean) {
    this._user.deleted = deleted
  }

  public getModifiedAt(): Date {
    return this._user.modified_at
  }
  public setModifiedAt(date: Date) {
    this._user.modified_at = date
  }

  public getCreatedAt(): Date {
    return this._user.created_at
  }
  public setCreatedAt(date: Date) {
    this._user.created_at = date
  }

  public getPhoto(): string {
    return this._user.photo
  }
  public setPhoto(photo: string) {
    this._user.photo = photo
  }
}
