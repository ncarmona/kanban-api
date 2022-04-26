import express, { Application } from "express"
import bodyParser from "body-parser"
import { router } from "./core/router"

const app: Application = express()
app.use(bodyParser.json())
const port = 5000
router(app)
app.listen(port, () => console.log("it works"))
