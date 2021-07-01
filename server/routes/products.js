import express from 'express';
import  auth  from '../middleware/auth.js'
import { deleteProd, updateProd, getProd, getProds, addProd } from '../controllers/products.js';

const router = express.Router();

router.get('/', getProds);
router.post('/', auth, addProd);
router.get('/:id', getProd);
router.patch('/:id', updateProd);
router.delete('/:id', deleteProd);

export default router;