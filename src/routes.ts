import { Router, Application, Request, Response } from "express"
import { Mailgun, EmailOptions } from "./mailgun"
import Redis from "./redis"

import hashingUtils from "./utils/hashing"

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

interface RequestHashOptions {
  email: string
}

emailRouter.post("/request-hash", async (req, res) => {
  const requestHashOptions = req.body as RequestHashOptions
  try {
    const { email } = requestHashOptions
    const hashedEmail = hashingUtils.makeEmailHash(email)
    await Redis.cacheStringForRetrieval(hashedEmail, email)
    res.send({ hash: hashedEmail })
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
})

interface VerifyHashOptions {
  hashedEmail: string
}

emailRouter.post("/verify-hash", async (req, res) => {
  const verifyHashOptions = req.body as VerifyHashOptions
  try {
    const { hashedEmail } = verifyHashOptions
    const email = await Redis.getCachedString(hashedEmail)

    if (!!email) {
      res.send({ found: true })
    } else {
      res.send({ found: false })
    }
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
