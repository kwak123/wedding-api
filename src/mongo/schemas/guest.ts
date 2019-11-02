import mongoose, { Document } from "mongoose"

export interface WeddingGuest extends Document {
  name: string
  plusOneId: string
  email: string
  confirmed: boolean
}

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  plusOneId: String,
  email: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
})

const Guest = mongoose.model("Guest", guestSchema)

export default Guest
