const redis = require("redis");
const REDIS_URL = process.env.REDIS_URL;

const client = redis.createClient({
  url: REDIS_URL,
});
client.on("connect", () => {
  console.log("Connected to Redis");
});
client.on("error", (err) => {
  console.error("Redis connection error:", err);
});

client.connect();
