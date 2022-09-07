import { S3, AWSError, Request } from "aws-sdk"
import { config as dotEnvConfig } from "dotenv"
import fs from "fs"

dotEnvConfig()

export async function uploadProfilePhoto(
  photo: Express.Multer.File
): Promise<Request<S3.PutObjectOutput, AWSError>> {
  const s3 = new S3()
  const Key = photo.originalname

  return s3.putObject({
    Body: fs.createReadStream(photo.path),
    Bucket: "kanban-uploads",
    ContentType: "image/webp",
    Key,
  })
}

export function getPublicFileURL(
  bucket: string,
  region: string,
  filename: string
): string {
  return "https://" + bucket + ".s3." + region + ".amazonaws.com/" + filename
}
