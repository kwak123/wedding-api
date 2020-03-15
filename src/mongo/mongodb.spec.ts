import mongoose, { Document } from "mongoose"
import MongoDb from "./index"
import { WeddingGuest } from "./schemas/guest"
import client, { Guest } from "./client"

describe("mongoDb tests", () => {
  beforeEach(async () => {
    await Guest.deleteMany({})
  })

  describe("addGuest", () => {
    it("should add a guest", async () => {
      const dummyGuest = makeDummyGuest()

      await MongoDb.addGuest(dummyGuest)

      const result = await Guest.findOne({ email: dummyGuest.email })
      expect(result.name).toEqual(dummyGuest.name)
      expect(result.email).toEqual(dummyGuest.email)
    })
  })

  describe("getAllGuests", () => {
    it("should return all guests", async () => {
      const dummyGuest = makeDummyGuest()

      await Guest.create(dummyGuest)

      const guestList = await MongoDb.getAllGuests()
      expect(guestList).toHaveLength(1)
      expect(guestList[0]).toMatchObject({
        name: dummyGuest.name,
        email: dummyGuest.email,
      })
    })
  })

  describe("getOrAddGuest", () => {
    it("should get a guest, if guest already exists", async () => {
      const dummyGuest = makeDummyGuest()

      await Guest.create(dummyGuest)
      const guest = await MongoDb.getOrAddGuest(dummyGuest.email)
      expect(guest.email).toEqual(dummyGuest.email)
    })

    it("should add guest, if not already exists", async () => {
      const defaultName = "Unnamed"
      const dummyEmail = "dummyEmail@dummy.com"
      const shouldBeNull = await Guest.findOne({ email: dummyEmail })

      expect(shouldBeNull).toBeNull()

      const guest = await MongoDb.getOrAddGuest(dummyEmail)
      const shouldNotBeNull = await Guest.findOne({ email: dummyEmail })
      expect(shouldNotBeNull).not.toBeNull()
      expect(guest.name).toBe(defaultName)
      expect(guest.email).toBe(dummyEmail)
    })
  })

  describe("setRsvp", () => {
    it("should set isAttending", async () => {
      const dummyGuest = makeDummyGuest()
      const initialGuestDetails = await Guest.create(dummyGuest)
      expect(initialGuestDetails.isAttending).toBe(false)
      await MongoDb.setRsvp(dummyGuest.email, true)
      const finalGuestDetails = await Guest.findOne({ email: dummyGuest.email })
      expect(finalGuestDetails.email).toBe(dummyGuest.email)
      expect(finalGuestDetails.isAttending).toBe(true)
    })
  })

  describe("linkPlusOne", () => {
    it("should link two guests by email", async () => {
      const dummyGuest = makeDummyGuest()
      const plusOneGuest = makeDummyGuest({
        name: "Plus one name",
        email: "plusOne@dummy.com",
      })

      await Guest.create(dummyGuest)
      await Guest.create(plusOneGuest)

      await MongoDb.linkPlusOne(dummyGuest.email, plusOneGuest.email)

      const finalDummyGuest = await Guest.findOne({ email: dummyGuest.email })
      const finalPlusOne = await Guest.findOne({ email: plusOneGuest.email })

      expect(finalDummyGuest.plusOneId).toEqual(finalPlusOne._id)
      expect(finalPlusOne.plusOneId).toEqual(finalDummyGuest._id)
    })

    it("should be happy if guest and plus one already linked", async () => {
      const dummyGuest = makeDummyGuest()
      const plusOneGuest = makeDummyGuest({
        name: "Plus one name",
        email: "plusOne@dummy.com",
      })

      const initialDummyGuest = await Guest.create(dummyGuest)
      const initialPlusOneGuest = await Guest.create(plusOneGuest)

      initialDummyGuest.plusOneId = initialPlusOneGuest._id
      initialPlusOneGuest.plusOneId = initialDummyGuest._id

      await initialDummyGuest.save()
      await initialPlusOneGuest.save()

      await MongoDb.linkPlusOne(dummyGuest.email, plusOneGuest.email)

      const finalDummyGuest = await Guest.findOne({ email: dummyGuest.email })
      const finalPlusOne = await Guest.findOne({ email: plusOneGuest.email })

      expect(finalDummyGuest.plusOneId).toEqual(finalPlusOne._id)
      expect(finalPlusOne.plusOneId).toEqual(finalDummyGuest._id)
    })

    it("should throw error if given plusOneEmail that IS NOT guest plusOneId", async () => {
      const guestHasPlusOneError = "Guest already has a plus one"
      const dummyGuest = makeDummyGuest()
      const plusOneGuest = makeDummyGuest({
        name: "Plus one name",
        email: "plusOne@dummy.com",
      })
      const wrongPlusOneGuest = makeDummyGuest({
        name: "Wrong plus one",
        email: "wrongPlusOne@dummy.com",
      })

      const initialDummyGuest = await Guest.create(dummyGuest)
      const initialPlusOneGuest = await Guest.create(plusOneGuest)
      await Guest.create(wrongPlusOneGuest)

      initialDummyGuest.plusOneId = initialPlusOneGuest._id
      initialPlusOneGuest.plusOneId = initialDummyGuest._id

      await initialDummyGuest.save()
      await initialPlusOneGuest.save()

      const tryLinkingWrongGuest = () =>
        MongoDb.linkPlusOne(dummyGuest.email, wrongPlusOneGuest.email)
      await expect(tryLinkingWrongGuest()).rejects.toEqual(guestHasPlusOneError)
    })
  })

  it("should throw linkage error, if guest plusOneId is correct but plusOne.plusOneId does not match guest", async () => {
    const plusOneMismatchError =
      "Plus one linkage error: guest.plusOneId matches plusOne, but plusOne.plusOneId does not match guest"
    const dummyGuest = makeDummyGuest()
    const plusOneGuest = makeDummyGuest({
      name: "Plus one name",
      email: "plusOne@dummy.com",
    })
    const someOtherGuest = makeDummyGuest({
      name: "Some other guest",
      email: "someOtherGuest@dummy.com",
    })

    const initialDummyGuest = await Guest.create(dummyGuest)
    const initialPlusOneGuest = await Guest.create(plusOneGuest)
    const initialOtherGuest = await Guest.create(someOtherGuest)

    initialDummyGuest.plusOneId = initialPlusOneGuest._id
    initialPlusOneGuest.plusOneId = initialOtherGuest._id

    await initialDummyGuest.save()
    await initialPlusOneGuest.save()

    const tryLinkingWrongGuest = () =>
      MongoDb.linkPlusOne(dummyGuest.email, plusOneGuest.email)
    await expect(tryLinkingWrongGuest()).rejects.toEqual(plusOneMismatchError)
  })

  const makeDummyGuest = ({
    name = "Dummy name",
    email = "dummyEmail@dummy.com",
  }: {
    name?: string
    email?: string
  } = {}): WeddingGuest => ({
    hasReceivedRsvp: false,
    isConfirmed: false,
    isAttending: false,
    name,
    isPlusOneEligible: false,
    plusOneId: null,
    email,
    dietaryRestrictions: [],
  })
})
