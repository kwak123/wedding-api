import mongoose, { Document } from "mongoose"

export const GUEST_SCHEMA_NAME = "Guest"

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
  plusOneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: GUEST_SCHEMA_NAME,
    required: false,
  },
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
