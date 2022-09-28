import { IResponse } from "@core/routes/IResponse"
import {
  userDoesNotExists,
  userHasBeenDisabled,
  userHasBeenEnabled,
  userHasBeenDeleted,
  userHasBeenUpdated,
} from "@responses/authResponses"
import { UserUseCases } from "@usecases/userUseCases"
import { MongoDBUserRepository } from "@repositories/userRepository/mongoDBUserRepository"
import { UserRepository } from "@repositories/userRepository/userRepository"
import { UserModel } from "@models/userModel/user.model"
import { unexpectedError } from "@core/responses/responses"
import { IUser } from "@interfaces/IUser"
import {
  getPublicFileURL,
  uploadProfilePhoto as uploadAWSProfilePhoto,
} from "../../utils/s3aws"
import { AWSError, S3 } from "aws-sdk"
import { removeTempFile } from "../../utils/fs"

export class UserController {
  private readonly userUseCases: UserUseCases
  private readonly mongoDBUserRepository: UserRepository

  constructor() {
    this.mongoDBUserRepository = new MongoDBUserRepository()
    this.userUseCases = new UserUseCases(this.mongoDBUserRepository)
  }

  async disable(id: string): Promise<IResponse> {
    let response: IResponse

    try {
      const user: UserModel = await this.userUseCases.disable(id)
      response = user.getDisabled() ? userHasBeenDisabled() : unexpectedError()
    } catch (error) {
      response = error === null ? userDoesNotExists() : unexpectedError()
    }

    return response
  }

  async enable(id: string): Promise<IResponse> {
    let response: IResponse

    try {
      const user: UserModel = await this.userUseCases.enable(id)
      response = !user.getDisabled() ? userHasBeenEnabled() : unexpectedError()
    } catch (error) {
      response = error === null ? userDoesNotExists() : unexpectedError()
    }

    return response
  }

  async delete(id: string): Promise<IResponse> {
    let response: IResponse

    try {
      const user: UserModel = await this.userUseCases.delete(id)
      response = user.getDeleted() ? userHasBeenDeleted() : unexpectedError()
    } catch (error) {
      response = error === null ? userDoesNotExists() : unexpectedError()
    }

    return response
  }
  private getPhotoNameFromURL(user: IUser) {
    const { photo } = user
    return photo.split("/").at(-1)
  }
  private getPhotonameFromFile(photo: Express.Multer.File) {
    const { originalname, filename } = photo
    const name: string[] = [filename]

    name.push(originalname.split(".").at(-1))
    return name.join(".")
  }
  private getPhotoName(user: IUser, photo: Express.Multer.File) {
    return user.photo === undefined
      ? this.getPhotonameFromFile(photo)
      : this.getPhotoNameFromURL(user)
  }
  private async uploadProfilePhoto(user: IUser, photo: Express.Multer.File) {
    try {
      const photoUpload = await uploadAWSProfilePhoto(photo)
      await photoUpload.send((err: AWSError, data: S3.PutObjectOutput) => {
        if (data) removeTempFile(photo.filename)
        if (err) console.error(err)
      })
      user.photo = this.getPhotoName(user, photo)
    } catch (error) {
      console.error(error)
    }
  }
  async update(user: IUser, photo: Express.Multer.File): Promise<IResponse> {
    let response: IResponse
    try {
      const getUser: UserModel = await this.userUseCases.getUserData(user._id)
      if (photo !== undefined) {
        photo.originalname = this.getPhotoName(getUser.getModel(), photo)
        this.uploadProfilePhoto(user, photo)
        user.photo = getPublicFileURL(
          "kanban-uploads",
          "eu-west-3",
          photo.originalname
        )
      }
      const userModel: UserModel = await this.userUseCases.update(user)
      response = !userModel.getDisabled()
        ? userHasBeenUpdated(userModel.getModel())
        : unexpectedError()
    } catch (error) {
      console.log(error)
      response = error === null ? userDoesNotExists() : unexpectedError()
    }

    return response
  }

  async getUserData(id: string): Promise<IResponse> {
    let response: IResponse
    try {
      const userModel: UserModel = await this.userUseCases.getUserData(id)
      response = !userModel.getDisabled()
        ? userHasBeenUpdated(userModel.getModel())
        : unexpectedError()
    } catch (error) {
      response = error === null ? userDoesNotExists() : unexpectedError()
    }

    return response
  }
}
