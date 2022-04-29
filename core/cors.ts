import { CorsOptions } from "cors"

const baseCors: CorsOptions = {
  methods: ["GET", "PUT", "POST", "DELETE"],
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
  optionsSuccessStatus: 200,
}
const allowAll: CorsOptions = baseCors
allowAll.origin = "*"

const allowOnlyWeb: CorsOptions = baseCors
allowOnlyWeb.origin = "localhost"

export { allowAll, allowOnlyWeb }
