import mongoose, { Document } from "mongoose"
import { WeddingGuest } from "./schemas/guest"
import { Guest } from "./client"

export interface MongoDbHelper {
  addGuest: (
    guest: WeddingGuest,
    plusOneEmail?: string
  ) => Promise<WeddingGuest>
  getAllGuests: () => Promise<WeddingGuest[]>
  getConfirmedGuests: () => Promise<WeddingGuest[]>
  getGuest: (email: string) => Promise<WeddingGuest>
  getOrAddGuest: (email: string) => Promise<WeddingGuest>
  setRsvp: (
    email: string,
    isAttending: boolean,
    plusOneEmail?: string
  ) => Promise<WeddingGuest>
  linkPlusOne: (
    guestEmail: string,
    plusOneEmail: string
  ) => Promise<WeddingGuest>
  removeGuest: (email: string) => Promise<boolean>
  toggleGuestConfirmation: (email: string) => Promise<WeddingGuest>
  confirmGuest: (email: string) => Promise<WeddingGuest>
}

class MongoDb implements MongoDbHelper {
  /**
   * Receive JS Object of wedding guest, hands back the MongoDB Variant
   */
  addGuest = async (guest: WeddingGuest, plusOneEmail?: string) => {
    const exists = await Guest.findOne({ email: guest.email })
    if (exists) {
      throw `Guest with email ${guest.email} already exists!`
    }

    if (plusOneEmail) {
      const plusOne = await Guest.findOne({ email: plusOneEmail })
      if (plusOne !== null) {
        guest.plusOneId = plusOne._id
      }
    }

    const newGuest = await Guest.create(guest)

    const savedGuest = (await newGuest.save()) as WeddingGuest & Document
    return savedGuest
  }

  getAllGuests = async () => {
    const allGuests = await Guest.find().populate("plusOneId")
    return allGuests as (WeddingGuest & Document)[]
  }

  getConfirmedGuests = async () => {
    const confirmedGuests = await Guest.find({ confirmed: true })
    return confirmedGuests as (WeddingGuest & Document)[]
  }

  getGuest = async (email: string) => {
    const guest = await Guest.findOne({ email }).populate("plusOneId")
    return guest as WeddingGuest & Document
  }

  getOrAddGuest = async (email: string) => {
    const guest = await this.getGuest(email)
    if (guest === null) {
      const newGuestDetails: WeddingGuest = {
        name: "Unnamed",
        email,
        hasReceivedRsvp: false,
        isAttending: false,
        isConfirmed: false,
        isPlusOneEligible: false,
        plusOneId: null,
        dietaryRestrictions: [],
      }
      return this.addGuest(newGuestDetails)
    }
    return guest
  }

  setRsvp = async (
    guestEmail: string,
    isAttending: boolean,
    plusOneEmail?: string
  ) => {
    const guest = await this.getGuest(guestEmail)
    guest.isAttending = isAttending

    if (plusOneEmail) {
      const plusOne = await this.getOrAddGuest(plusOneEmail)
      await this.linkPlusOne(guestEmail, plusOneEmail)
      plusOne.isAttending = isAttending
      await plusOne.save()
    }

    await guest.save()
    return guest
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
    const guest = (await Guest.findOne({ email })) as WeddingGuest & Document
    guest.isConfirmed = !guest.isConfirmed
    const savedGuest = (await guest.save()) as WeddingGuest
    return savedGuest
  }

  confirmGuest = async (email: string) => {
    const guest = (await Guest.findOne({ email })) as WeddingGuest & Document
    guest.isConfirmed = true
    const savedGuest = (await guest.save()) as WeddingGuest
    return savedGuest
  }

  /**
   * Give an email, returns true if able to delete. Will also attempt to remove plusOneIds if possible
   */
  removeGuest = async (email: string) => {
    const deletedCount = await Guest.deleteOne({ email })
    return deletedCount > 0
  }
}

const instance = new MongoDb()

export default instance
