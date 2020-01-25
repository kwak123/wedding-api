import mongoose from "mongoose"

import guestSchema, { WeddingGuest } from "./schemas/guest"

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
  })
  .then(() => console.log("Connected to Mongo"))

const db = mongoose.connection
const Guest = mongoose.model("Guest", guestSchema)

guestSchema.pre("deleteOne", async function removeReferenceFromPlusOne(next) {
  const guest = this as WeddingGuest
  const guestWithReference = ((await Guest.find({
    plusOneId: guest._id,
  })) as unknown) as WeddingGuest
  if (!guestWithReference !== null) {
    guestWithReference.plusOneId = null
    await guestWithReference.save()
  }
  next()
})

export default db

export { Guest }
