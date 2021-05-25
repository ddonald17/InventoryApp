//imports
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/users.js';
import productRoutes from './routes/products.js';
import transactionRoutes from './routes/Transactions.js';



//app-configs
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use(cors());


 app.use('/user',userRoutes);
 app.use('/product',productRoutes);
 app.use('/transaction',transactionRoutes);

//dbconfigs
 const connection_url ='mongodb+srv://ddonald17:ddonald17@cluster0.fcgy7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

 
mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(port, () => console.log(`Server Running on Port: http://localhost:${port}`)))
.catch((error) => console.log(`${error} did not connect`));


mongoose.set('useFindAndModify',false);
