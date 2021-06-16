import mongoose from 'mongoose';

const TransSchema = mongoose.Schema({
    cust_name:{
        type: String,
        required: true
    },
    cust_address:{
        type: String
    },
    item: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product'
    },
    quantity:{
        type: Number,
        required: true
    },
    sell_price:{
        type: Number,
        required: true
    },
    timestamp:{
        type: Date,
        default: new Date()
    },
    
});

const Transaction = mongoose.model('Transaction',TransSchema);

export default Transaction;
