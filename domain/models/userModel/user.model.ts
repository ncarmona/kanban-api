import { IUser } from "@interfaces/IUser"

export class UserModel {
  private _user: IUser | null

  constructor(user: IUser | null) {
    if (user === null) this._user = null
    else
      this._user = {
        created_at: user.created_at,
        deleted: user.deleted,
        disabled: user.disabled,
        email: user.email,
        modified_at: user.modified_at,
        _id: user._id,
        name: user.name,
        password: user.password,
        photo: user.photo,
        activation_token: user.activation_token,
      }
  }

  public getId(): string | undefined {
    return this._user._id
  }
  public setId(_id: string) {
    this._user._id = _id
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
    this._user.modified_at = new Date(date)
  }

  public getCreatedAt(): Date {
    return this._user.created_at
  }
  public setCreatedAt(date: Date) {
    this._user.created_at = new Date(date)
  }

  public getPhoto(): string {
    return this._user.photo
  }
  public setPhoto(photo: string) {
    this._user.photo = photo
  }

  public getActivationToken(): string {
    return this._user.activation_token
  }
  public setActivationToken(activationToken: string) {
    this._user.activation_token = activationToken
  }

  public getModel(): IUser | null {
    return this._user
  }
}
