const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    address: {
        type: String,
        required: true
    }, 
    order: {
        type: String,
        required: true
    },
    paid: {
        type: String,
        required: true 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("orders", orderSchema);