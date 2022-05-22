import express from 'express';

import meetingRoute from './meeting';
import eventRoute from './event';
import userRoute from './user';

const router = express.Router();

/// All routes here :
router.use('/meeting', meetingRoute);
router.use('/event', eventRoute);
router.use('/user', userRoute);

export default router;
