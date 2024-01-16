function validateUpdateData(req, res, next) {
  const newQuestionBlog = { ...req.body };
  const newTitle = newQuestionBlog.title ?? "";
  const newDescription = newQuestionBlog.description ?? "";

  if (newTitle == "" && newDescription == "") {
    return res.status(422).json({ message: "invalid title and description" });
  }
  next();
}

export default validateUpdateData;
