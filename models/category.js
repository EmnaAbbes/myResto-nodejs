const mongoose = require("mongoose")
const categorySchema = mongoose.Schema({
    categoryName: { type: String, required: true, unique: true },
    categoryImage: { type: String, required: false }
})
module.exports = mongoose.model('category', categorySchema)