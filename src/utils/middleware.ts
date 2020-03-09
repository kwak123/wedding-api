import { Request, Response } from "express"

const stubHandler = (req: Request, res: Response) =>
  res.send("Received the route!")

const handleError = (e: Error, res: Response, statusCode: number = 500) => {
  console.error(e)
  return res.sendStatus(statusCode)
}

export { stubHandler, handleError }
