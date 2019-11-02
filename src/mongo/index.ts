import mongoose from "mongoose"
import Guest, { WeddingGuest } from "./schemas/Guest"

class MongoDb {
  /**
   * Receive JS Object of wedding guest, hands back the MongoDB Variant
   */
  addGuest = async (guest: WeddingGuest) => {
    const exists = await Guest.findOne({ email: guest.email })
    if (exists) {
      throw `Guest with email ${guest.email} already exists!`
    }

    const newGuest = new Guest(guest)
    const savedGuest = (await newGuest.save()) as WeddingGuest
    return savedGuest
  }
}

export default MongoDb
