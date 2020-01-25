import mongoose, { Document } from "mongoose"

export const GUEST_SCHEMA_NAME = "Guest"

// Make sure README stays in sync with this
export interface WeddingGuest extends Document {
  // Guest name
  name: string

  // Mongo ID of Guest's plus-one
  plusOneId: string

  // Guest email - used as UUID outside of Mongo ID
  email: string

  // Whether guest has responded to RSVP
  confirmed: boolean

  // Whether guest is attending or not
  attending: boolean

  // List of dietary restrictions, simply string for now
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
    unique: true,
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
