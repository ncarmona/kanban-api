import { IConnector } from "./IConnector"
import Mongoose from "mongoose"
import { config as dotEnvConfig } from "dotenv"

dotEnvConfig()

export class MongoDBConnector implements IConnector {
  connectionString?: string
  private readonly mongoose

  constructor() {
    this.connectionString = this.generateConnectionString()
    this.mongoose = Mongoose
  }
  private generateConnectionString(): string {
    const {
      DATABASE_USER: user,
      DATABASE_PASSWORD: password,
      DATABASE_DB: db,
      DATABASE_SERVER: server,
      DATABASE_PROTOCOL: protocol,
    } = process.env

    const uri: string =
      protocol + "://" + user + ":" + password + "@" + server + "/" + db + ""

    return uri
  }

  link(): Promise<typeof import("mongoose")> {
    return this.mongoose.connect(this.connectionString)
  }
  status(): Mongoose.Connection {
    return this.mongoose.connection
  }
}
