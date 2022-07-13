export interface TestRepository {
  dropCollections(): Promise<unknown>
}
