import express from 'express';

import {
  createMeeting,
  getMeeting,
  updateMeeting,
  deleteMeeting,
  getAllMeeting,
  getRecording,
} from '../controllers/meeting';
import response from '../util/response';

const router = express.Router();

router.get('/', response(getAllMeeting));
router.post('/', response(createMeeting));
router.get('/:id', response(getMeeting));
router.put('/:id', response(updateMeeting));
router.delete('/:id', response(deleteMeeting));
router.get('/:id/recording', response(getRecording));

export default router;
