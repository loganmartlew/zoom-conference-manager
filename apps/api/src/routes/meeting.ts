import express from 'express';

import {
  createMeeting,
  getMeeting,
  updateMeeting,
  deleteMeeting,
  getAllMeeting,
} from '../controllers/meeting';

const router = express.Router();

router.get('/', getAllMeeting);
router.post('/', createMeeting);
router.get('/:id', getMeeting);
router.put('/:id', updateMeeting);
router.delete('/:id', deleteMeeting);

export default router;
