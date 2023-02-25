import { config as dotEnvConfig } from "dotenv"

export function setEnvironment() {
  const path: string = "envs/." + process.env.EXEC_MODE + ".env"
  dotEnvConfig({path})
}
