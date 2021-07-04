import Transaction from '../models/transaction.js';
import Product from '../models/product.js';

export const addTrans = async (req, res) => {
    const { cust_name, cust_address, item, quantity, sell_price } = req.body;
    console.log(req.body)
    const newTrans = new Transaction({ cust_name, cust_address, item, quantity, sell_price });
    
    try {
        await newTrans.save();
        
        // 1. Create variables what needs to be replaced, what should be replaced with
        let itemId = item
        let itemObject = await Product.findById(itemId)
        let quantityToBeUpdated = itemObject.stock - quantity
        
        let updatedItem = Product.findByIdAndUpdate(item, { stock: quantityToBeUpdated })
        newTrans.item = updatedItem

        // 2. Update the thing

        // 3.  Send response

        res.status(201).json( newTrans );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getTrans = async (req, res) => { 
    try {
        const getTransaction = await Transaction.find().populate('item');
                
        res.status(200).json(getTransaction);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
