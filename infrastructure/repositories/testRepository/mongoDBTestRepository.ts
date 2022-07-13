import { TestRepository } from "./testRepository"
import { IConnector } from "../../../core/repository/connectors/IConnector"
import { MongoDBConnector } from "../../../core/repository/connectors/MongoDBConnector"
import Mongoose from "mongoose"

export class MongoDBTestRepository implements TestRepository {
  private readonly connector: IConnector
  constructor() {
    this.connector = new MongoDBConnector()
    this.connector.link()
  }
  dropCollections(): Promise<boolean> {
    const connection: Mongoose.Connection =
      this.connector.status() as Mongoose.Connection
    return connection.db.dropDatabase()
  }
}
