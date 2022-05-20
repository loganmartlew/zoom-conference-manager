import express from 'express';

import {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  addMeetingToEvent,
} from '../controllers/event';

const router = express.Router();

router.get('/', getAllEvents);
router.post('/', createEvent);
router.get('/:id', getEvent);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);

router.patch('/:id/meeting', addMeetingToEvent);

export default router;
