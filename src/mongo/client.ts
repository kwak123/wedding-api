/* istanbul ignore file */
import mongoose, { Document } from "mongoose"

import guestSchema, { WeddingGuest } from "./schemas/guest"

let dbName = "dev"
let ssl = false

if (process.env.NODE_ENV === "prod") {
  dbName = "kwakanalia"
  ssl = true
} else if (process.env.NODE_ENV === "test") {
  dbName = "test"
}

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    ssl,
    dbName,
  })
  .then(() => console.log("Connected to Mongo"))

const db = mongoose.connection
const Guest = mongoose.model<WeddingGuest & Document>("Guest", guestSchema)

guestSchema.pre("deleteOne", async function removeReferenceFromPlusOne(next) {
  const guest = this as WeddingGuest & mongoose.Document
  const guestWithReference = ((await Guest.find({
    plusOneId: guest._id,
  })) as unknown) as WeddingGuest & mongoose.Document
  if (!guestWithReference !== null) {
    guestWithReference.plusOneId = null
    await guestWithReference.save()
  }
  next()
})

export default db

export { Guest }
