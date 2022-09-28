import { Schema, model } from "mongoose"

const schema = new Schema({
  name: {
    required: true,
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
})
const mongoDBBoard = model("Board", schema)
export { mongoDBBoard }
