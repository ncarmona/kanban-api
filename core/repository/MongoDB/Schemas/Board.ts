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
  disabled: {
    type: Boolean,
    default: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  modified_at: {
    type: Date,
    default: Date.now(),
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
})
const mongoDBBoard = model("Board", schema)
export { mongoDBBoard }
