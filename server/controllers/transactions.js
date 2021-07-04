import Transaction from '../models/transaction.js';
import Product from '../models/product.js';

export const addTrans = async (req, res) => {
    const { cust_name, cust_address, item, quantity, sell_price } = req.body;
    console.log(req.body)
    const newTrans = new Transaction({ cust_name, cust_address, item, quantity, sell_price });
    
    try {

        // Get new Product
        let product = await Product.findOne({ _id: item }).lean().exec();
        console.log(`UPDATED PRODUCT`, product);

        // Get the quantity
        let updatedQuantity = product.stock - Number(quantity);
        console.log(`UPDATED QUANTITY:`, updatedQuantity);


        product = await Product.findByIdAndUpdate(item, { stock: updatedQuantity }, { new: true }).lean().exec();
        console.log(`UPDATED PRODUCT `, product);


        await newTrans.save();

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
