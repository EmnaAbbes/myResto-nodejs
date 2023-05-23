const express = require('express');
const router = express.Router();
const product = require("../models/product")
router.get('/',async (req, res,) => {
    try {
        const products = await product.find().populate("categoryID").exec();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { designation, price, productImg, categoryID } = req.body;
    
    const newProduct = new product({ designation: designation, price: price, productImg: productImg, categoryID: categoryID })
    try {
        await newProduct.save()
        res.status(200).json(newProduct)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/:productId', async (req, res) => {
    try {
        const prod = await product.findById(req.params.productId).populate("categoryID").exec();
        res.status(200).json(prod);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.put('/:productId', async (req, res) => {
    const { designation, price, productImg, categorieID } = req.body;
    const id = req.params.productId;
    try {
        const prod = {
            designation: designation, price: price, productImg: productImg, categorieID: categorieID, _id: id
        };
        await product.findByIdAndUpdate(id, prod);
        res.json(prod);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.delete('/:productId', async (req, res) => {
    const id = req.params.productId;
    await product.findByIdAndDelete(id);
    res.json({ message: "product deleted successfully." });
});

module.exports = router