import { unlink } from "fs"

export function removeTempFile(name: string) {
  const path = "./uploads/" + name
  unlink(path, (err) => {
    if (err) throw err
  })
}
