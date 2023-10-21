const platformAuthRequired = (req, res, next) => {
  const platform = req.header("jambonz");

  if (platform !== "jambonz") {
    console.log(platform);
    return res.status(401).send("Not");
  }

  next();
};

export default platformAuthRequired;
