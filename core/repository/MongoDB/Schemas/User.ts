import { randomUUID } from "crypto"
import { Schema, model } from "mongoose"
import { environmentIs, Environments } from "@utils/environment"

const schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
  activation_token: {
    type: String,
    default: function () {
      return environmentIs(Environments.TEST)
        ? "123456"
        : randomUUID().toString()
    },
  },
  name: String,
  photo: String,
})

const mongoDBUser = model("User", schema)

export { mongoDBUser }
