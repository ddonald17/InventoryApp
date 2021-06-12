import mongoose from 'mongoose';
import Product from '../models/product.js';


export const addProd = async (req, res) => {
    const { item_name, category, stock, buy_price } = req.body;

    const newProd = new Product({  item_name, category, stock, buy_price });

    try {
        await newProd.save();
        res.status(201).json( newProd );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateProd = async (req, res) => {
    const { id: _id } = req.params;
    // const { item_name, category, stock, buy_price } = req.body;
    const prod = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedProd =  await Product.findByIdAndUpdate(_id, { ...prod, _id}, { new: true });

    res.json(updatedProd);
}

export const deleteProd = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Product.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const getProds = async (req, res) => { 
    try {
        const getProduct = await Product.find();
                
        res.status(200).json(getProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProd = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}