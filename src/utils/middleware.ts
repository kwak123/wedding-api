import { Request, Response } from "express"

const stubHandler = (req: Request, res: Response) =>
  res.send("Received the route!")

const handleError = (e: Error, res: Response) => {
  console.error(e)
  return res.sendStatus(500)
}

export { stubHandler, handleError }
