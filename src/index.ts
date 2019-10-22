import express from "express"
import path from "path"
import "./redis/client"
import "./mongo/client"

const app = express()
app.use(express.json())

app.use(express.static(path.join(__dirname, "../public")))
app.get("/test", (req, res) => {
  res.send("Hello!")
})

app.listen(3000, () => {
  console.log("Listening")
})
