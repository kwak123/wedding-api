import mongoose from "mongoose"
import { WeddingGuest } from "./schemas/Guest"
import { Guest } from "./client"

export interface MongoDbHelper {
  addGuest: (guest: WeddingGuest) => Promise<WeddingGuest>
  getAllGuests: () => Promise<WeddingGuest[]>
  getConfirmedGuests: () => Promise<WeddingGuest[]>
  getGuest: (email: string) => Promise<WeddingGuest>
  linkPlusOne: (
    guestEmail: string,
    plusOneEmail: string
  ) => Promise<WeddingGuest>
  removeGuest: (email: string) => Promise<boolean>
  toggleGuestConfirmation: (email: string) => Promise<WeddingGuest>
}

class MongoDb implements MongoDbHelper {
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
    const allGuests = await Guest.find().populate("plusOneId")
    return allGuests as WeddingGuest[]
  }

  getConfirmedGuests = async () => {
    const confirmedGuests = await Guest.find({ confirmed: true })
    return confirmedGuests as WeddingGuest[]
  }

  getGuest = async (email: string) => {
    const guest = await Guest.findOne({ email })
    return guest as WeddingGuest
  }

  linkPlusOne = async (guestEmail: string, plusOneEmail: string) => {
    const guest = await this.getGuest(guestEmail)
    const plusOne = await this.getGuest(plusOneEmail)

    if (guest.plusOneId) {
      throw "Guest already has a plus one"
    }

    if (plusOne.plusOneId) {
      throw "Plus one already has a plus one"
    }

    guest.plusOneId = plusOne._id
    plusOne.plusOneId = guest._id
    await plusOne.save()
    const savedGuest = (await guest.save()) as WeddingGuest
    return savedGuest
  }

  toggleGuestConfirmation = async (email: string) => {
    const guest = (await Guest.findOne({ email })) as WeddingGuest
    guest.confirmed = !guest.confirmed
    const savedGuest = (await guest.save()) as WeddingGuest
    return savedGuest
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
