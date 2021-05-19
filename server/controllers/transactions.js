import mongoose from 'mongoose';
import Transaction from '../models/transaction.js';


export const addTrans = async (req, res) => {
    const { cust_name, cust_address, item, quantity, sell_price } = req.body;

    const newTrans = new Transaction({ cust_name, cust_address, item, quantity, sell_price });

    try {
        await Transaction.save();

        res.status(201).json( newTrans );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getTrans = async (req, res) => { 
    try {
        const getTransaction = await Transaction.find();
                
        res.status(200).json(getTransaction);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
