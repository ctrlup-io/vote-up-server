import "dotenv/config";
import { createServer } from "http";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, cert } from "firebase-admin/app";
import { Server } from "socket.io";
import boxen from "boxen";
import chalk from "chalk";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

async function request(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}
const serviceAccount = await request(
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);
initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();
const votes = db.collection("votes");

const origin = [process.env.APP_URI];
const app = express();
app.use(cors({ origin }));
const server = createServer(app);
const io = new Server(server, { cors: { origin } });

io.on("connection", (socket) => {
  console.log(chalk.bold(`👋  New participant ${socket.id}`));

  socket.on("disonnect", () => {
    console.log(chalk.bold(`👋  Bye ${socket.id}`));
  });

  socket.on("vote", async (id) => {
    if (id) {
      const ref = votes.doc(id);
      const doc = await ref.get();
      if (doc.exists) {
        const prev = doc.data()?.count || 0;
        const count = prev + 1;
        await ref.update({ count });
        io.emit("voted", { id, count });
        console.log(chalk.bold(`🗳️  New vote for ${id}`));
      }
    }
  });
});

app.get("/votes", async (req, res) => {
  const snapshot = await votes.limit(50).get();
  if (snapshot.empty) {
    res.json([]);
  } else {
    res.json(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }
});

const port = parseInt(process.env.PORT) || 8080;
server.listen(port, () => {
  console.info(
    boxen(chalk.bold(`🌈 Server listening to ${port}`), {
      padding: 1,
      margin: 2,
    })
  );
});
