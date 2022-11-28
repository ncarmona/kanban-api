import { IUser } from "../../interfaces/IUser"
import { UserModel } from "./user.model"
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
describe("Non nullish user model", () => {
  let userModel: UserModel
  beforeEach(() => (userModel = new UserModel(user)))
  it("Model attribute must return user object", () => {
    expect(userModel.model).toStrictEqual(user)
  })
  it("Get user id", () => expect(userModel.id).toStrictEqual(user._id))
  it("Get created_at", () =>
    expect(userModel.createdAt).toStrictEqual(user.created_at))
  it("Get deleted", () => expect(userModel.deleted).toBe(user.deleted))
  it("Set deleted", () => {
    userModel.deleted = true
    expect(userModel.deleted).toBeTruthy()
  })
  it("Get disabled", () => expect(userModel.disabled).toBe(user.disabled))
  it("Set disabled", () => {
    userModel.disabled = true
    expect(userModel.disabled).toBeTruthy()
  })
  it("Get email", () => expect(userModel.email).toBe(user.email))
  it("Set email", () => {
    const email = "fak2@mail.com"
    userModel.email = email
    expect(userModel.email).toStrictEqual(email)
  })
  it("Get password", () => expect(userModel.password).toBe(user.password))
  it("Set password", () => {
    const password = "tttttt"
    userModel.password = password
    expect(userModel.password).toStrictEqual(password)
  })
  it("Get modified at", () =>
    expect(userModel.modifiedAt).toBe(user.modified_at))
  it("Set modified at", () => {
    const modified_at = new Date()
    userModel.modifiedAt = modified_at
    expect(userModel.modifiedAt).toStrictEqual(modified_at)
  })
  it("Get photo", () => expect(userModel.photo).toBe(user.photo))
  it("Set photo", () => {
    const photo = "new_photo.jpeg"
    userModel.photo = photo
    expect(userModel.photo).toStrictEqual(photo)
  })
  it("Get activation token", () =>
    expect(userModel.activationToken).toBe(user.activation_token))
  it("Set activation token", () => {
    const token = "12345"
    userModel.activationToken = token
    expect(userModel.activationToken).toStrictEqual(token)
  })
})

describe("Nullish user model", () => {
  let userModel: UserModel
  const throwNullModel = "User model is null."
  beforeEach(() => (userModel = new UserModel(null)))
  it("Null parameter must create a nullish model", () =>
    expect(userModel.model).toBeNull())
  it("Null model must return null id", () => expect(userModel.id).toBeNull())
  it("Null model must return null created_at", () =>
    expect(userModel.createdAt).toBeNull())
  it("Null model must return null deleted", () =>
    expect(userModel.deleted).toBeNull())
  it("Delete field can not be modified in nullish model", () => {
    expect(() => {
      userModel.deleted = false
    }).toThrow(throwNullModel)
  })
  it("Null model must return null disabled", () =>
    expect(userModel.disabled).toBeNull())
  it("Disabled field can not be modified in nullish model", () => {
    expect(() => {
      userModel.disabled = false
    }).toThrow(throwNullModel)
  })
  it("Null model must return null email", () =>
    expect(userModel.email).toBeNull())
  it("Email field can not be modified in nullish model", () => {
    expect(() => {
      userModel.email = user.email
    }).toThrow(throwNullModel)
  })
  it("Null model must return null name", () =>
    expect(userModel.name).toBeNull())
  it("Name field can not be modified in nullish model", () => {
    expect(() => {
      userModel.name = user.name
    }).toThrow(throwNullModel)
  })
  it("Null model must return null password", () =>
    expect(userModel.password).toBeNull())
  it("Password field can not be modified in nullish model", () => {
    expect(() => {
      userModel.password = user.password
    }).toThrow(throwNullModel)
  })
  it("Null model must return null modified_at", () =>
    expect(userModel.modifiedAt).toBeNull())
  it("Modified_at field can not be modified in nullish model", () => {
    expect(() => {
      userModel.modifiedAt = user.modified_at
    }).toThrow(throwNullModel)
  })
  it("Null model must return null photo", () =>
    expect(userModel.photo).toBeNull())
  it("Photo field can not be modified in nullish model", () => {
    expect(() => {
      userModel.photo = user.photo
    }).toThrow(throwNullModel)
  })
  it("Null model must return null activation token", () =>
    expect(userModel.activationToken).toBeNull())
})
