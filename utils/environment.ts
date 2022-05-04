const { ENVIRONMENT } = process.env

export enum Environments {
  DEV = "dev",
  TEST = "test",
  PROD = "prod",
}

export function environmentIs(env: Environments) {
  return env === ENVIRONMENT
}
