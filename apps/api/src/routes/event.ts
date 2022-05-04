import express from 'express';

import {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} from '../controllers/event';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEvent);
router.post('/', createEvent);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
