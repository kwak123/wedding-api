import { Router, Application, Request, Response } from "express"
import { Mailgun, EmailOptions } from "./mailgun"

import { buildGuestRouter } from "./routers/guest"

import MongoDb from "./mongo"

const router = Router()

router.post("/guest", (req, res) => {
  res.send("Received the route!")
})

const guestRouter = buildGuestRouter(MongoDb)

// Send email to guest

const emailRouter = Router()

const mailgunClient = new Mailgun(process.env.MG_API_KEY)

emailRouter.post("/test", async (req, res) => {
  const emailOptions = req.body as EmailOptions
  try {
    console.log(req.body)
    await mailgunClient.sendEmail(emailOptions)
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
})

const configureApp = (app: Application) => {
  app.use("/api", router)

  router.use("/email", emailRouter)
  router.use("/guest", guestRouter)
}

export default configureApp
