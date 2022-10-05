import { IUser } from "../../interfaces/IUser"
import { UserModel } from "./user.model"

describe("User model", () => {
  let userModel: UserModel
  const user: IUser = {
    _id: "1",
    created_at: new Date(),
    deleted: false,
    disabled: false,
    email: "mail@fake.com",
    name: "user name",
    password: "secretpassword",
    modified_at: new Date(),
    photo: "picture.png",
    activation_token: "twegewgegsdg",
  }
  beforeEach(() => (userModel = new UserModel(user)))
  it.only("User model constructor parameter can be nullish", () => {
    expect(new UserModel(null).getModel()).toBeNull()
  })
  it("User without ID should no return user with ID", () => {
    const user: IUser = {
      //id: "1",
      created_at: new Date(),
      deleted: false,
      disabled: false,
      email: "mail@fake.com",
      name: "user name",
      password: "secretpassword",
      modified_at: new Date(),
      photo: "picture.png",
      activation_token: "twegewgegsdg",
    }
    const userModel: UserModel = new UserModel(user)
    const userID = userModel.getId()

    expect(userID).toBeUndefined()
  })
  it("User with ID should no return user with ID", () => {
    const userID = userModel.getId()

    expect(userID).toBe(user._id)
  })
  it("Set ID should assign an ID to user", () => {
    const expectedID = "2"
    userModel.setId(expectedID)

    expect(userModel.getId()).toBe(expectedID)
  })

  it("User name must be the same in the model and the IUser", () => {
    expect(userModel.getName()).toStrictEqual(user.name)
  })
  it("User name must be assigned with setName", () => {
    const name = "user2"
    userModel.setName(name)

    expect(userModel.getName()).toStrictEqual(name)
  })

  it("Password must be the same in the model and the IUser", () => {
    expect(userModel.getPassword()).toStrictEqual(user.password)
  })
  it("User password must be assigned with setPassword", () => {
    const password = "secretP"
    userModel.setPassword(password)

    expect(userModel.getPassword()).toStrictEqual(password)
  })

  it("Email must be the same in the model and the IUser", () => {
    expect(userModel.getEmail()).toStrictEqual(user.email)
  })
  it("User email must be assigned with setEmail", () => {
    const email = "mail@mail.com"
    userModel.setEmail(email)

    expect(userModel.getEmail()).toStrictEqual(email)
  })

  it("Disabled must be the same in the model and the IUser", () => {
    expect(userModel.getDisabled()).toStrictEqual(user.disabled)
  })
  it("User disabled must be assigned with setDisabled", () => {
    const disabled = true
    userModel.setDisabled(disabled)

    expect(userModel.getDisabled()).toStrictEqual(disabled)
  })

  it("Deleted must be the same in the model and the IUser", () => {
    expect(userModel.getDeleted()).toStrictEqual(user.deleted)
  })
  it("User deleted must be assigned with setDeleted", () => {
    const deleted = true
    userModel.setDeleted(deleted)

    expect(userModel.getDeleted()).toStrictEqual(deleted)
  })

  it("Modified_at must be the same in the model and the IUser", () => {
    expect(userModel.getModifiedAt()).toStrictEqual(user.modified_at)
  })
  it("User modified_at must be assigned with setModifiedAt", () => {
    const modified_at = new Date()
    userModel.setModifiedAt(modified_at)

    expect(userModel.getModifiedAt()).toStrictEqual(modified_at)
  })

  it("Created_at must be the same in the model and the IUser", () => {
    expect(userModel.getCreatedAt()).toStrictEqual(user.created_at)
  })
  it("User created_at must be assigned with setCreatedAt", () => {
    const created_at = new Date()
    userModel.setCreatedAt(created_at)

    expect(userModel.getCreatedAt()).toStrictEqual(created_at)
  })
  it("User photo must be the same in the model and the IUser", () => {
    expect(userModel.getPhoto()).toStrictEqual(user.photo)
  })
  it("User photo must be assigned with setPhoto", () => {
    const photo = "photo2.png"
    userModel.setPhoto(photo)

    expect(userModel.getPhoto()).toStrictEqual(photo)
  })
  it("User activation token must be the same in the model and the IUser", () => {
    expect(userModel.getActivationToken()).toStrictEqual(user.activation_token)
  })
  it("User activation token must be assigned with setPhoto", () => {
    const activation_token = "sdggdsgdshdfhfh"
    userModel.setActivationToken(activation_token)

    expect(userModel.getActivationToken()).toStrictEqual(activation_token)
  })
})
