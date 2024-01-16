import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";
import validateData from "../middldewares/validateData.js";
import validateUpdateData from "../middldewares/validateUpdateData.js";
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

questionPostsRouter.put("/:id", validateUpdateData, async (req, res) => {
  const collection = db.collection("question-posts");
  const targetID = new ObjectId(req.params.id);
  const newQuestionBlog = { ...req.body };
  const newTitle = newQuestionBlog.title;
  const newDescription = newQuestionBlog.description;

  try {
    if (newTitle != "") {
      const updateTitle = await collection.updateOne(
        { _id: targetID },
        { $set: { title: newTitle } }
      );
    }
    if (newDescription != "") {
      const updateTitle = await collection.updateOne(
        { _id: targetID },
        { $set: { description: newDescription } }
      );
    }
    return res.status(200).json({ message: `ID ${targetID} has been update` });
  } catch {
    return res
      .status(500)
      .json({ message: "can't update title or deacription" });
  }
});
questionPostsRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("question-posts");
  const targetID = new ObjectId(req.params.id);

  try {
    const deleteQuestion = await collection.deleteOne({ _id: targetID });
    return res
      .status(200)
      .json({
        message: `Question ID : ${targetID} has been deleted successfully`,
      });
  } catch {
    return res
      .status(409)
      .json({ message: `server can't delete question ID : ${targetID}` });
  }
});

export default questionPostsRouter;
