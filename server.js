const path = require("path");
const express = require("express");
const port = process.env.PORT || 5000;
const colors = require("colors");
const dotevv = require("dotenv").config();
const conectDB = require("./config/db");
const { errorHandeler } = require("./middleware/errorMiddlewre");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Please set to production");
  });
}

app.use(errorHandeler);

app.listen(port, () => console.log(`port created in ${port}`));
