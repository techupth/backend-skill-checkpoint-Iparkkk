import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";
import validateData from "../middldewares/validateData.js";

const questionPostsRouter = Router();

questionPostsRouter.get("/", async (req, res) => {
  const collection = db.collection("question-posts");
  const limit = req.query.limit ?? 10;
  try {
    const questionBlogs = await collection.find({}).limit(limit).toArray();
    return res.status(200).json({ data: questionBlogs });
  } catch {
    return res.status(500).json("server is failed");
  }
});

questionPostsRouter.get("/:id", async (req, res) => {
  const collection = db.collection("question-posts");
  const targetID = new ObjectId(req.params.id);
  try {
    const questionBlog = await collection.findOne({ _id: targetID });
    return res.status(200).json({ data: questionBlog });
  } catch {
    return res.status(500).json("server is failed");
  }
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
