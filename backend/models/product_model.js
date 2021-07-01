const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true 
    },
    stock: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("products", productSchema);