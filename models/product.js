const mongoose = require("mongoose")
const category = require("./category")
const productSchema = mongoose.Schema({
    designation: { type: String, required: true, unique: true },
    price: { type: Number, required: false },
    productImg: { type: String, required: false },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: category
    }
})
module.exports = mongoose.model('product', productSchema)