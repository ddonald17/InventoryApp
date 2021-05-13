import mongoose from 'mongoose';

const TransSchema = mongoose.Schema({
    cust_name:{
        type: String,
        required: true
    },
    cust_address:{
        type: String
    },
    item_name:{
        type: String,
        required:true
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
        type: Date
    }
    
});

const Transaction = mongoose.Schema('Transaction',TransSchema);

export default Transaction;
