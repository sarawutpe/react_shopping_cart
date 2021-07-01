const express = require("express");
const router = express.Router();
const apiTypes = require("../apiTypes");
const bcrypt = require("bcrypt");
const userSchema = require("../models/user_model");

// Register
router.post("/register", async (req, res) => {
  try {
    // Check username already exists (ถ้าหากเป็น true แสดงว่ามีอยู่ในระบบ)
    const userExists = await userSchema.exists({"username": req.body.username});
    if (userExists) {
      throw "Username already exists!";
    } else {
      const { username, fullname, email} = req.body;
      const password = bcrypt.hashSync(req.body.password, 8);
      const result = await new userSchema({ username, fullname, email, password }).save();
      res.json([{status: apiTypes.ResultOk}, {message: result}]);
    }
  } catch (error) {
    res.json({ status: apiTypes.ResultNotOk, message: error })
  }
})

// Login
router.post("/login", async (req, res) =>{
  try {
    const { username, password } = req.body;
    const findUser = await userSchema.findOne({"username": username});
    if (findUser) {
      if (bcrypt.compareSync(password, findUser.password)) {
        res.json([{status: apiTypes.ResultOk}, {message: findUser}]);
      } else {
        throw "Password is incorrect!";
      }
    }
    throw "Username does not exist!";
  } catch (error) {
    res.json({ status: apiTypes.ResultNotOk, message: error })
  }
})

// Get all users
router.get("/users", async (req, res) => {
  try {
    const findResult =  await userSchema.find();
    res.json({ status: apiTypes.ResultOk, result: findResult})
  } catch (error) {
    res.json({ status: apiTypes.ResultNotOk, message: error })
  }
})

// Delete all users
router.delete("/users/clear", async (req, res) => {
  try {
    const deleteResult = await userSchema.deleteMany();
    res.json({ status: apiTypes.ResultOk, result: deleteResult})
  } catch (error) {
    res.json({ status: apiTypes.ResultNotOk, message: error })
  }
})

module.exports = router