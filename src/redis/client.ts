import redis from "redis"
import Logger from "../utils/logger"

// Test
import path from "path"
import fs from "fs"
import bcrypt from "bcrypt"

const logger = new Logger("redis:client")
const client = redis.createClient()

client.on("ready", () => {
  logger.log("Connected")
})

client.on("error", error => {
  logger.error("Failed to load %o", error)
})

export default client

const filePath = path.join(__dirname, "../../data/emails.txt")
fs.readFile(filePath, (err, result) => {
  if (err) {
    logger.error("Failed to read email data %o", err)
  }
  const stringified = result.toString().split("\n")
  const testString = stringified[0]
})
