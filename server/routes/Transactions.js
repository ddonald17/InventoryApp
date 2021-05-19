import express from 'express';

import { addTrans, getTrans } from '../controllers/transactions.js';

const router = express.Router();

router.get('/', getTrans);
router.post('/', addTrans);

export default router;