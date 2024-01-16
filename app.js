import express from "express";
import { client } from "./utils/db.js";
import questionPostsRouter from "./router-group/question-posts.js";

async function init() {
  const app = express();
  const port = 4000;

  try {
    await client.connect();
    console.log("status : 200 connected to database is successfully");
  } catch {
    console.log("status : 400 can't connect to database");
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/question-posts", questionPostsRouter);

  app.get("*", (req, res) => {
    return res.status(404).json("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
