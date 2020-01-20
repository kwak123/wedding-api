import { Router } from "express"

import { MongoDbHelper } from "../mongo"
import { handleError } from "../utils/middleware"

const buildGuestRouter = (mongoDb: MongoDbHelper) => {
  const guestRouter = Router()

  guestRouter.post("/add", async (req, res) => {
    const weddingGuest = req.body

    try {
      const guest = await mongoDb.addGuest(weddingGuest)
      return res.send(guest)
    } catch (e) {
      handleError(e, res)
    }
  })

  guestRouter.put("/confirm", async (req, res) => {
    const { guestEmail } = req.body

    try {
      const guest = await mongoDb.confirmGuest(guestEmail)
      return res.send(guest)
    } catch (e) {
      handleError(e, res)
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
      handleError(e, res)
    }

    return res.send("yes")
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

  return guestRouter
}

export { buildGuestRouter }
