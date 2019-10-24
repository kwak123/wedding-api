import mongoose from "mongoose"

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
