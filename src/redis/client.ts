import redis from "redis"
import Logger from "../utils/logger"

const logger = new Logger("redis:client")
const client = redis.createClient()

client.on("ready", () => {
  logger.log("Connected")
})

client.on("error", error => {
  logger.error("Failed to load %o", error)
})

export default client
