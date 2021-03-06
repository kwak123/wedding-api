/* istanbul ignore file */
import redis from "redis"

const client = redis.createClient(process.env.REDIS_URL)

client.on("ready", () => {
  console.log("Connected to Redis")
})

client.on("error", error => {
  console.error("Failed to load %o", error)
})

client.on("reconnecting", () => {
  console.log("Redis reconnecting...")
})

client.on("end", () => {
  if (process.env.NODE_ENV !== "test") {
    console.log("Redis disconnected")
  }
})

export default client
