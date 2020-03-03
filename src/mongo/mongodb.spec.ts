import mongoose from "mongoose"
import MongoDb from "./index"
import { WeddingGuest } from "./schemas/guest"
import client, { Guest } from "./client"

describe("mongoDb tests", () => {
  describe("getAllGuests", () => {
    beforeEach(async () => {
      await Guest.deleteMany({})
    })

    it("should return all guests", async () => {
      const dummyGuest: WeddingGuest = {
        hasReceivedRsvp: false,
        isConfirmed: false,
        isAttending: false,
        name: "Dummy name",
        isPlusOneEligible: false,
        plusOneId: null,
        email: "dummyEmail@dummy.com",
        dietaryRestrictions: [],
      }

      await Guest.create(dummyGuest)

      const guestList = await MongoDb.getAllGuests()
      expect(guestList).toHaveLength(1)
      expect(guestList[0]).toMatchObject({
        name: "Dummy name",
        email: "dummyEmail@dummy.com",
      })
    })
  })
})
