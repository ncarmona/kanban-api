import { CorsOptions } from "cors"

const baseCors: CorsOptions = {
  methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
}
const allowAll: CorsOptions = baseCors
allowAll.origin = "*"

const allowOnlyWeb: CorsOptions = baseCors
allowOnlyWeb.origin = "https://localhost:3000"

export { allowAll, allowOnlyWeb }
