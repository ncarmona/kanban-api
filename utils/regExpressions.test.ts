import { regexEmail } from "./regExpressions"

describe("Email regex", () => {
  it("Normal string", () => {
    expect(regexEmail("text")).toBeFalsy()
  })
  it("String with spaces", () => {
    expect(regexEmail("just a text")).toBeFalsy()
  })
  it("String with @", () => {
    expect(regexEmail("text@")).toBeFalsy()
  })
  it("String without .es", () => {
    expect(regexEmail("text@mail")).toBeFalsy()
  })
  it("Valid mail", () => {
    expect(regexEmail("hello@noelcarmona.com")).toBeTruthy()
  })
})
