require("module-alias/register")
import express, { Application } from "express"
import bodyParser from "body-parser"
import { router } from "./core/router"
import helmet from "helmet"
import fs from "fs"
import path from "path"
import morgan from "morgan"

const app: Application = express()

app.use(bodyParser.json())
app.use(helmet())
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
      flags: "a",
    }),
  })
)

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
