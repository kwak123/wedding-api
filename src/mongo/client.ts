import mongoose from "mongoose"

import guestSchema from "./schemas/guest"

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
  })
  .then(() => console.log("Connected to Mongo"))

const db = mongoose.connection
const Guest = mongoose.model("Guest", guestSchema)

export default db

export { Guest }
