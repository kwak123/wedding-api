import mongoose from "mongoose"

import "./schemas/guest"

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo"))

const db = mongoose.connection

export default db
