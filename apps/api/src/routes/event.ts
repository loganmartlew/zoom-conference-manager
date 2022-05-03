import express from 'express';

import { createEvent, getEvent, updateEvent, deleteEvent } from '../controllers/event';


const router = express.Router();

router.get('/', getEvent);
router.post('/', createEvent);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);


export default router;