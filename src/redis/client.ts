import redis from "redis"

const client = redis.createClient("redis://cache")

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
  console.log("Redis disconnected")
})

export default client
