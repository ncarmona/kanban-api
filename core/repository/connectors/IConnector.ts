export interface IConnector {
  connectionString?: string
  link(): unknown
  status(): unknown
}
