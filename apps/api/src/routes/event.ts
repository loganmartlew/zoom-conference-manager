import express from 'express';

import {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} from '../controllers/event';
import response from '../util/response';

const router = express.Router();

router.get('/', response(getAllEvents));
router.post('/', response(createEvent));
router.get('/:id', response(getEvent));
router.patch('/:id', response(updateEvent));
router.delete('/:id', response(deleteEvent));

export default router;
