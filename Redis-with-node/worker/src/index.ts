import { createClient } from "redis";

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error!", err));

async function main() {
  try {
    await client.connect();
    console.log("Connected to redis");
    while (true) {
      const response = await client.brPop("problems", 1);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(response);
    }
  } catch (error) {
    console.error("Failed to connect to redis!", error);
  }
}
main();
