import express from 'express'
import {createNotes,getNoteById,getNotes} from '../controllers/notes.js'
const router = express.Router();
router.post('/create',createNotes)
router.get('/',getNotes)
router.get('/:id',getNoteById);

export default router;