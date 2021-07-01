const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Connect to mongodb function
connectMongodb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/react-shopping-cart-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
      console.log("Mongodb connection success");
  } catch (error) {
      console.error("Mongodb connection failed!");
  }
};

// Connect to MongoDB
connectMongodb();

// parses requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static folder
// app.use(express.static(__dirname + "./uploaded"));
app.use(express.static(__dirname));

// middleware
app.use(cors());

// api route
app.use("/api/v2/authen/", require("./api/api_authen"));
app.use("/api/v2/stock/", require("./api/api_stock"));
app.use("/api/v2/transaction/", require("./api/api_order"))

// run on port
app.listen(8085, () => {
  console.log("Backend is running...");
});
