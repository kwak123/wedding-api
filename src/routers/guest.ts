import { Router } from "express"

import { MongoDbHelper } from "../mongo"
import { handleError } from "../utils/middleware"
import { RsvpBody } from "./types/guest"

import * as GuestRouterTypes from "./types/guest"

const buildGuestRouter = (mongoDb: MongoDbHelper) => {
  const guestRouter = Router()

  // Need to account for looking for guest email if possible
  guestRouter.post("/add", async (req, res) => {
    const { guestEmail, ...weddingGuest } = req.body

    try {
      const guest = await mongoDb.addGuest(weddingGuest, guestEmail)
      return res.send(guest)
    } catch (e) {
      handleError(e, res, 400)
    }
  })

  // Whether or not a guest has confirmed their invite (potentially useless?)
  guestRouter.put("/confirm", async (req, res) => {
    const { guestEmail } = req.body

    try {
      const guest = await mongoDb.confirmGuest(guestEmail)
      return res.send(guest)
    } catch (e) {
      handleError(e, res)
    }
  })

  // // Set the guest details
  guestRouter.put("/rsvp", async (req, res) => {
    // FIXME: skwak 3/16/2020 this is a dev convenience
    const body = req.body as RsvpBody
    const { guestEmail, isAttending, plusOneEmail } = body
    try {
      const confirmedGuest = await mongoDb.setRsvp(
        guestEmail,
        isAttending,
        plusOneEmail
      )
      return res.send(confirmedGuest)
    } catch (e) {
      handleError(e, res, 400)
    }
  })

  guestRouter.post("/confirm/toggle", async (req, res) => {
    const { guestEmail } = req.body

    try {
      const guest = await mongoDb.toggleGuestConfirmation(guestEmail)
      return res.send(guest)
    } catch (e) {
      handleError(e, res)
    }
  })

  guestRouter.post("/link/", async (req, res) => {
    const { guestEmail, plusOneEmail } = req.body

    try {
      const guest = await mongoDb.linkPlusOne(guestEmail, plusOneEmail)
      return res.send(guest)
    } catch (e) {
      handleError(e, res, 400)
    }
  })

  guestRouter.get("/get/all", async (req, res) => {
    try {
      const allGuests = await mongoDb.getAllGuests()
      return res.send(allGuests)
    } catch (e) {
      handleError(e, res)
    }
  })

  guestRouter.get("/get/:guestEmail", async (req, res) => {
    try {
      const guest = await mongoDb.getGuest(req.params.guestEmail)
      return res.send(guest)
    } catch (e) {
      handleError(e, res)
    }
  })

  guestRouter.get("/get/confirmed", async (req, res) => {
    try {
      const confirmedGuests = await mongoDb.getConfirmedGuests()
      return res.send(confirmedGuests)
    } catch (e) {
      handleError(e, res)
    }
  })

  guestRouter.delete("/del/:guestEmail", async (req, res) => {
    try {
      const deletedGuest = await mongoDb.removeGuest(req.params.guestEmail)
      return res.sendStatus(200)
    } catch (e) {
      handleError(e, res)
    }
  })

  return guestRouter
}

export { buildGuestRouter }
