import mongoose, { Document } from "mongoose"

export const GUEST_SCHEMA_NAME = "Guest"

// Make sure README stays in sync with this
export interface WeddingGuest {
  // Whether guest has entered their email to view RSVP on wedding-site
  hasReceivedRsvp: boolean

  // Whether guest has responded to RSVP
  isConfirmed: boolean

  // Whether guest is attending or not
  isAttending: boolean

  // Guest name
  name: string

  // Whether or not the guest gets a plus one
  isPlusOneEligible: boolean

  // Mongo ID of Guest's plus-one
  plusOneId: WeddingGuest | mongoose.Types.ObjectId

  // Guest email - used as UUID outside of Mongo ID
  email: string

  // List of dietary restrictions, simply string for now
  dietaryRestrictions: string[]
}

const guestSchema = new mongoose.Schema({
  hasReceivedRsvp: {
    type: Boolean,
    default: false,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  isAttending: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  isPlusOneEligible: {
    type: Boolean,
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
  dietaryRestrictions: {
    type: Array,
    default: [],
  },
})

export default guestSchema
