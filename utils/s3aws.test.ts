import { getPublicFileURL } from "./s3aws"
describe("getPublicFileURL", () => {
  it("generates correctly public file URL", () => {
    const bucket = "my-bucket"
    const region = "eu-west-3"
    const filename = "uploadedfile.txt"
    const expectedPublicFileURL =
      "https://" + bucket + ".s3." + region + ".amazonaws.com/" + filename
    const publicFileURL = getPublicFileURL(bucket, region, filename)

    expect(expectedPublicFileURL).toEqual(publicFileURL)
  })
})
