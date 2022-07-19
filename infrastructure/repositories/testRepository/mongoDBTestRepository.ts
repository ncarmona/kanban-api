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
  async dropCollections(): Promise<boolean> {
    const connection: Mongoose.Connection =
      this.connector.status() as Mongoose.Connection
    const collectionNames: string[] = (await connection.db.collections()).map(
      (c) => c.collectionName
    )
    let dropped = true

    try {
      collectionNames.forEach(async (collection: string) => {
        await connection.db.collection(collection).deleteMany({})
      })
    } catch (error) {
      dropped = false
    }

    return dropped
  }
}
