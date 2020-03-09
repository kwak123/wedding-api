import express, { Request, Response, NextFunction } from "express"
import path from "path"
import "./redis/client"
import "./mongo/client"

import configureRouter from "./routes"

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Received ${req.method}: ${req.url}`)
  next()
}

const app = express()
app.use(express.json())

app.use(express.static(path.join(__dirname, "../dist")))

app.use(logRequest)

configureRouter(app)

export default app
