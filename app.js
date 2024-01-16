import express from "express";
import { client } from "./utils/db.js";

async function init() {
  const app = express();
  const port = 4000;

  try {
    await client.connect();
    console.log("status : connected to database is successfully");
  } catch {
    console.log("Message : can't connect to database");
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get("/", (req, res) => {
    return res.json("Hello Skill Checkpoint #2");
  });

  app.get("*", (req, res) => {
    return res.status(404).json("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
