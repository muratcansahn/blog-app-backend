const express = require("express");
const app = express();
const port = 5000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

// Connect to DB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB connection successful!"))
  .catch((err) => console.log(err));

app.use("/", (req, res) => {
  res.send("Hello World");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));