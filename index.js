const express = require("express");
const { auth } = require("./middleware/auth.middleware");
const { UserModel } = require("./model/user.model");
const { postRouter } = require("./routes/post.route");
const { userRouter } = require("./routes/user.route");
const { connection } = require("./config/db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/users", userRouter);

app.use(auth);

app.use("/posts", postRouter);

app.listen(4500, async () => {
  try {
    await connection;
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
  console.log("Running at Port 4500");
});
