const express = require("express");
const port = process.env.PORT || 5000;
const dotevv = require("dotenv").config();

const app = express();

app.use("/api/goals", require("./routes/goalRoutes"));

app.listen(port, () => console.log(`port created in ${port}`));
