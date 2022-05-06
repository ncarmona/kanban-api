/* eslint-disable prettier/prettier */
require("module-alias/register")
require("@core/environment")

import { IConnector } from "@core/repository/connectors/IConnector"
import { MongoDBConnector } from "@core/repository/connectors/MongoDBConnector"
import express, { Application } from "express"
import bodyParser from "body-parser"
import { router } from "./core/router"
import helmet from "helmet"
import fs from "fs"
import path from "path"
import morgan from "morgan"
import cookiesParser from "cookie-parser"
import https from "https"

const app: Application = express()

app.use(cookiesParser())
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
https
  .createServer(
    {
      key: fs.readFileSync("keys/https/key.pem"),
      cert: fs.readFileSync("keys/https/cert.pem"),
    },
    app
  )
  .listen(port, async () => {
  connector = new MongoDBConnector()
  try {
    await connector.link()
  } catch (error) {
    console.error(error)
  }
})
