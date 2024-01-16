import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";
import validateData from "../middldewares/validateData.js";

const questionPostsRouter = Router();

questionPostsRouter.get("/", (req, res) => {
  return res.json("Hello worlds test database connected");
});

questionPostsRouter.post("/", validateData, async (req, res) => {
  const collection = db.collection("question-posts");
  const questionBlogData = { ...req.body };

  try {
    const createQuestion = await collection.insertOne(questionBlogData);
    return res.status(201).json({
      message: `question post ID: ${createQuestion.insertedId}has been create successfully`,
    });
  } catch {
    return res.status(500).json({ message: "can't create new question post" });
  }
});
export default questionPostsRouter;
