import mongoose from "mongoose"
import { WeddingGuest } from "./schemas/Guest"
import { Guest } from "./client"

class MongoDb {
  /**
   * Receive JS Object of wedding guest, hands back the MongoDB Variant
   */
  addGuest = async (guest: WeddingGuest) => {
    const exists = await Guest.findOne({ email: guest.email })
    if (exists) {
      throw `Guest with email ${guest.email} already exists!`
    }

    const newGuest = await Guest.create(guest)
    const savedGuest = (await newGuest.save()) as WeddingGuest
    return savedGuest
  }

  getAllGuests = async () => {
    const allGuests = await Guest.find()
    return allGuests
  }

  getGuest = async (email: string) => {
    const guest = await Guest.findOne({ email })
    return guest
  }

  /**
   * Give an email, returns true if able to delete
   */
  removeGuest = async (email: string) => {
    const deletedCount = await Guest.deleteOne({ email })
    return deletedCount > 0
  }
}

const instance = new MongoDb()

export default instance
