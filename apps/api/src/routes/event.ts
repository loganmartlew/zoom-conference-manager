import express from 'express';

import {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  publishEvent,
  unpublishEvent,
  deleteEvent,
} from '../controllers/event';
import response from '../util/response';

const router = express.Router();

router.get('/', response(getAllEvents));
router.post('/', response(createEvent));
router.get('/:id', response(getEvent));
router.put('/:id', response(updateEvent));
router.patch('/:id/publish', response(publishEvent));
router.patch('/:id/unpublish', response(unpublishEvent));
router.delete('/:id', response(deleteEvent));

export default router;
