import express from 'express';

import meetingRoute from './meeting';
import eventRoute from './event';

const router = express.Router();

/// All routes here :
router.use('/meetings', meetingRoute);
router.use('/events', eventRoute);

export default router;
