const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");


const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 2, async (err, hash) => {
      if (err) {
        res.send("Something Went Wrong");
      } else {
        const user = new UserModel({ name, email, password: hash, gender });
        await user.save();
        res.send("Registed");
      }
    });
  } catch (error) {
    console.log(error);
    res.send("Something Went Wrong");
  }
});

userRouter.post("/login", async (req, res) => {
  const payload = req.body;

  try {
    let user = await UserModel.findOne({ email: payload.email });

    if (user) {




      bcrypt.compare(payload.password, user.password, (err, result) => {
        if (result) {
          jwt.sign({ user_id: user._id }, "dev", (err, token) => {
            res.send({ msg: "Login Successfull", token: token });
          });
        } else {
          res.send("Wrong Password");
        }
      });
    } else {
      res.send("Register First");
    }
  } catch (error) {
    console.log(error);
    res.send("Something Went Wrong");
  }
});

module.exports = {
  userRouter,
};
