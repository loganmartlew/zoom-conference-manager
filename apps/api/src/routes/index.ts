import express from 'express';

import eventRoute from './event';
import meetingRoute from './meeting';
import zoomUserRoute from './zoomUser';

const router = express.Router();

/// All routes here :
router.use('/events', eventRoute);
router.use('/meetings', meetingRoute);
router.use('/zoom-users', zoomUserRoute);

export default router;
