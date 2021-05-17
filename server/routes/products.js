import express from 'express';

import { createProd, deleteProd, updateProd, getProd, getProds } from '../controllers/products.js';

const router = express.Router();

router.get('/', getProds);
router.post('/', createProd);
router.get('/:id', getProd);
router.patch('/:id', updateProd);
router.delete('/:id', deleteProd);

export default router;``