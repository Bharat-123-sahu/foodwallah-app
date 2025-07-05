const Product = require("../models/product");



exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
        console.log("Product added:", newProduct);
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
 
console.log("Product type:", typeof Product);