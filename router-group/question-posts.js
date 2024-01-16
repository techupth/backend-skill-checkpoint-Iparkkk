import { Router } from "express";

const questionPostsRouter = Router();

questionPostsRouter.get("/", (req, res) => {
  return res.json("Hello worlds test database connected");
});

export default questionPostsRouter;
