import { Router, Application, Request, Response } from "express"
import { Mailgun, EmailOptions } from "./mailgun"
import MongoDb from "./mongo"

const router = Router()

const stubHandler = (req: Request, res: Response) =>
  res.send("Received the route!")

router.post("/guest", (req, res) => {
  res.send("Received the route!")
})

const guestRouter = Router()

guestRouter.post("/add", async (req, res) => {
  const weddingGuest = req.body
  console.log(weddingGuest)

  try {
    const guest = await MongoDb.addGuest(weddingGuest)
    return res.send(guest)
  } catch (e) {
    console.error(e)
    return res.sendStatus(500)
  }
})

guestRouter.get("/get/all", async (req, res) => {
  try {
    const allGuests = await MongoDb.getAllGuests()
    return res.send(allGuests)
  } catch (e) {
    console.error(e)
    return res.sendStatus(500)
  }
})

// Send email to guest

const emailRouter = Router()

const mailgunClient = new Mailgun(process.env.MG_API_KEY)

emailRouter.post("/test", async (req, res) => {
  const emailOptions = req.body as EmailOptions
  try {
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
