import { unexpectedError } from "../../core/responses/responses"
import { IResponse } from "../../core/routes/IResponse"
import { TestUseCases } from "../../application/usecases/testUseCases"
import { TestRepository } from "../repositories/testRepository/testRepository"
import { MongoDBTestRepository } from "../repositories/testRepository/mongoDBTestRepository"
import {
  databaseCleared,
  databaseNotCleared,
} from "../../responses/test/testResponses"
export class TestController {
  private readonly testUseCases: TestUseCases
  private readonly mongoDBTestRepository: TestRepository

  constructor() {
    this.mongoDBTestRepository = new MongoDBTestRepository()
    this.testUseCases = new TestUseCases(this.mongoDBTestRepository)
  }

  async dropCollections(): Promise<IResponse> {
    let response: IResponse

    try {
      const drop: boolean = await this.testUseCases.dropCollections()
      response = drop ? databaseCleared() : databaseNotCleared()
    } catch (error) {
      response = unexpectedError()
    }

    return response
  }
}
