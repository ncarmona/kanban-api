import { IUser } from "@interfaces/IUser"

export class UserModel {
  private readonly _user: IUser | null

  constructor(user: IUser | null) {
    this._user =
      {
        _id: user?._id ?? null,
        activation_token: user?.activation_token ?? null,
        created_at: user?.created_at ?? null,
        deleted: user?.deleted ?? null,
        disabled: user?.disabled ?? null,
        email: user?.email ?? null,
        modified_at: user?.modified_at ?? null,
        name: user?.name ?? null,
        password: user?.password ?? null,
        photo: user?.photo,
      } ?? null
  }

  public get id(): string {
    return this._user._id?.toString() ?? null
  }

  public get name(): string {
    return this._user.name
  }
  public set name(name: string) {
    if (this._user.name) this._user.name = name
    else throw new Error("User model is null.")
  }

  public get password(): string {
    return this._user.password
  }
  public set password(password: string) {
    if (this._user.password) this._user.password = password
    else throw new Error("User model is null.")
  }

  public get email(): string {
    return this._user.email
  }
  public set email(email: string) {
    if (this._user.email) this._user.email = email
    else throw new Error("User model is null.")
  }

  public get disabled(): boolean {
    return this._user.disabled
  }
  public set disabled(disabled: boolean) {
    if (typeof this._user.disabled === "boolean") this._user.disabled = disabled
    else throw new Error("User model is null.")
  }

  public get deleted(): boolean {
    return this._user.deleted
  }
  public set deleted(deleted: boolean) {
    if (typeof this._user.deleted === "boolean") this._user.deleted = deleted
    else throw new Error("User model is null.")
  }

  public get modifiedAt(): Date {
    return this._user.modified_at
  }
  public set modifiedAt(date: Date) {
    if (this._user.modified_at) this._user.modified_at = date
    else throw new Error("User model is null.")
  }

  public get createdAt(): Date {
    return this._user.created_at
  }

  public get photo(): string {
    return this._user.photo ?? null
  }
  public set photo(photo: string) {
    if (this._user.photo) this._user.photo = photo
    else throw new Error("User model is null.")
  }

  public get activationToken(): string {
    return this._user.activation_token
  }
  public set activationToken(activationToken: string) {
    if (this._user.activation_token)
      this._user.activation_token = activationToken
    else throw new Error("User model is null.")
  }

  public get model(): IUser {
    return this._user._id ? this._user : null
  }
}
