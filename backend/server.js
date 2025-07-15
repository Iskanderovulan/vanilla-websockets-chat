import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const app = express();
const port = 3001;
const filePath = path.resolve("messages.json");

let messages = [];

async function initMessages() {
  try {
    const data = await readFile(filePath, "utf-8");
    messages = JSON.parse(data);
  } catch (err) {
    if (err.code !== "ENOENT") console.error("Load error:", err);
    messages = [];
  }
}
await initMessages();

app.use(cors());
app.use(express.json());

app.get("/messages", (_, res) => {
  res.json(messages);
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("[srv] client connected");

  ws.on("message", (data) => {
    let parsed;
    try {
      parsed = JSON.parse(data.toString());
    } catch (e) {
      console.warn("Invalid message:", data.toString());
      return;
    }

    const { author, text } = parsed;
    const message = {
      author,
      text,
      timestamp: new Date().toISOString(),
    };

    messages.push(message);
    writeFile(filePath, JSON.stringify(messages, null, 2)).catch(console.error);

    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  });

  ws.on("close", (code) => console.log(`[srv] disconnected (code=${code})`));
  ws.on("error", (err) => console.error("[srv] WS error:", err));
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
