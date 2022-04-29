import { IConnector } from "./core/repository/connectors/IConnector"
import { MongoDBConnector } from "./core/repository/connectors/MongoDBConnector"
import express, { Application } from "express"
import bodyParser from "body-parser"
import { router } from "./core/router"
import helmet from "helmet"

const app: Application = express()
app.use(bodyParser.json())
app.use(helmet())
const port = 5000
let connector: IConnector

router(app)
app.listen(port, async () => {
  connector = new MongoDBConnector()
  try {
    await connector.link()
  } catch (error) {
    console.error(error)
  }
})
