import { TestRepository } from "../../infrastructure/repositories/testRepository/testRepository"
export class TestUseCases {
  private readonly database: TestRepository

  constructor(database: TestRepository) {
    this.database = database
  }

  dropCollections(): Promise<boolean> {
    return this.database.dropCollections() as Promise<boolean>
  }
}
