function validateData(req, res, next) {
  const blogDatas = { ...req.body };
  const title = blogDatas.title ?? "";
  const description = blogDatas.description ?? "";
  const category = blogDatas.category ?? "";

  if (title == "" || category == "") {
    return res
      .status(401)
      .json({ message: `information in body is incorrect` });
  }

  next();
}

export default validateData;
