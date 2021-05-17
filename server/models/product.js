import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    item_id:{
        type: String,
        required: true
    },
    item_name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    buy_price:{
        type: Number,
        required: true
    }
});

const Product = mongoose.Schema('Product',ProductSchema);

export default Product;