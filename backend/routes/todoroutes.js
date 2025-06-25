import express from 'express';
import { addDescription , getallTodo , DeleteTodo, updateTodo } from '../controllers/tododesc.js';

const router = express.Router();

router.post('/add', addDescription);
router.get('/all', getallTodo);
router.put('/update/:id',updateTodo);
router.delete('/delete/:id', DeleteTodo);


export default router;