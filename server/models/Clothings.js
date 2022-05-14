const mongoose = require('mongoose')

const ClothingSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    cost: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const ClothingModel = mongoose.model("clothings", ClothingSchema)
module.exports = ClothingModel