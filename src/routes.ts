import { Router, Application, Request, Response } from "express"
import { Mailgun } from "./mailgun"

const router = Router()

const stubHandler = (req: Request, res: Response) =>
  res.send("Received the route!")

router.post("/guest", (req, res) => {
  res.send("Received the route!")
})

// Send email to guest

const emailRouter = Router()

const mailgunClient = new Mailgun(process.env.MG_API_KEY)

emailRouter.post("/test", async (req, res) => {
  try {
    await mailgunClient.sendEmail()
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
})

const configureApp = (app: Application) => {
  app.use("/api", router)

  router.use("/email", emailRouter)
}

export default configureApp
