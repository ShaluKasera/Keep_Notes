import express from 'express'
import {createNotes,getNoteById,getNotes} from '../controllers/notes.js'
import authMiddleware from '../middleware/auth.js';
const router = express.Router();
router.post('/create',authMiddleware,createNotes)
router.get('/',authMiddleware,getNotes)
router.get('/:id',authMiddleware,getNoteById);

export default router;