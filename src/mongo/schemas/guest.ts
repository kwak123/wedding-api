import mongoose, { Document } from "mongoose"

export interface WeddingGuest extends Document {
  name: string
  plusOneId: string
  email: string
  confirmed: boolean
  dietaryRestrictions: string[]
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
  dietaryRestrictions: {
    type: Array,
    default: [],
  },
})

export default guestSchema
