import { IConnector } from "./IConnector"
import Mongoose from "mongoose"

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

    return (
      protocol + "://" + user + ":" + password + "@" + server + "/" + db + ""
    )
  }

  link(): Promise<typeof import("mongoose")> {
    return this.mongoose.connect(this.connectionString)
  }
  status(): Mongoose.Connection {
    return this.mongoose.connection
  }
}
