import express from "express"
import path from "path"
import "./redis/client"
import "./mongo/client"

import configureRouter from "./routes"

const app = express()
app.use(express.json())

app.use(express.static(path.join(__dirname, "../dist")))

configureRouter(app)

app.listen(3000, () => {
  console.log("Listening")
})
