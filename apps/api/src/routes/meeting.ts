import express from 'express';

import { createMeeting, getMeeting, updateMeeting, deleteMeeting } from '../controllers/meeting';


const router = express.Router();

router.get('/', getMeeting);
router.post('/', createMeeting);
router.patch('/:id', updateMeeting);
router.delete('/:id', deleteMeeting);


export default router;