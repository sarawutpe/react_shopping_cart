const express = require("express");
const router = express.Router();
const apiTypes = require("../apiTypes");
const orderSchema = require("../models/order_model");

// Add order
router.post("/order", async (req, res) => {
    try {
        const result = await new orderSchema(req.body).save();
        res.json([{status: apiTypes.ResultOk}, {message: result }]);
    } catch (error) {
        res.json([{status: apiTypes.ResultNotOk}, {message: error }]);
    }
})

module.exports = router