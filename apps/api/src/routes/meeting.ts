import express from 'express';

import {
  createMeeting,
  getMeeting,
  updateMeeting,
  deleteMeeting,
  getAllMeeting,
  getTodaysMeetings,
  getUpcomingMeetings,
} from '../controllers/meeting';
import response from '../util/response';

const router = express.Router();

router.get('/', response(getAllMeeting));
router.post('/', response(createMeeting));
router.get('/today', response(getTodaysMeetings));
router.get('/upcoming', response(getUpcomingMeetings));
router.get('/:id', response(getMeeting));
router.put('/:id', response(updateMeeting));
router.delete('/:id', response(deleteMeeting));

export default router;
