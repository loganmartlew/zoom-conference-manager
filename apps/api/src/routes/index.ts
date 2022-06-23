import express from 'express';

import meetingRoute from './meeting';
import eventRoute from './event';

const router = express.Router();

/// All routes here :
router.use('/meeting', meetingRoute);
router.use('/event', eventRoute);

export default router;
