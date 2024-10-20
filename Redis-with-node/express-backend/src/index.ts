import express from "express";
import { createClient } from "redis";
const app = express();

app.use(express.json());

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error!", err));

app.get("/", (req, res) => {
  res.send("Hello User!");
});
app.post("/submit", async (req, res) => {
  const { problemId, userId, language, code } = req.body;
  try {
    await client.lPush(
      "problems",
      JSON.stringify({ code, language, problemId, userId })
    );
    res.status(200).send("Submission received and stored!");
  } catch (error) {
    console.error("Redis Error!", error);
    res.status(500).send("Failed to store submission!");
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to redis");
    app.listen(3000, () => {
      console.log("Server is running on port 3000!");
    });
  } catch (error) {
    console.error("Failed to connect to redis!", error);
  }
}
startServer();
