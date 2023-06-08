const express = require("express");
const port = process.env.PORT || 5000;
const dotevv = require("dotenv").config();
const { errorHandeler } = require("./middleware/errorMiddlewre");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/goals", require("./routes/goalRoutes"));

app.use(errorHandeler);

app.listen(port, () => console.log(`port created in ${port}`));
