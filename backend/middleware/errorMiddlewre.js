const errorHandeler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    messege: "input text feild",
    stack: process.env.NODE_ENV === "production" ? nul : err.stack,
  });
};

module.exports = {
  errorHandeler,
};