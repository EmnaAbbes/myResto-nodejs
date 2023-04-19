var express = require("express")
var router = express.Router()
const category = require("../models/category")
router.get('/', async (req, res) => {
    try {
        const cat = await category.find()
        res.status(200).json(cat)
    }
    catch (error) {
        res.status(404).json({ message: error.message });

    }
})

router.post('/', async (req, res) => {
    const { name, image } = req.body
    const newCat = new category({ categoryName: name, categoryImage: image })
    try {
        await newCat.save()
        res.status(200).json(newCat)
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
})

router.get('/:categoryId', async (req, res) => {
    try {
        const cat = await category.findById(req.params.categoryId);
        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

})

router.put('/:categoryId', async (req, res) => {
    const { name, image } = req.body
    const id = req.params.categoryId
    try {
        const cat = { _id: id, categoryName: name, categoryImage: image }
        await category.findByIdAndUpdate(id, cat)
        res.json(cat)
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }

})
router.delete('/:categoryId', async (req, res) => {
    const id = req.params.categoryId;
    await category.findByIdAndDelete(id);
    res.json({ message: "category deleted successfully." });
});


module.exports = router