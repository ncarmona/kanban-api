import express, { Application } from "express"
import { router } from "./core/router"

const app: Application = express()
const port = 5000
router(app)
app.listen(port, () => console.log("it works"))
