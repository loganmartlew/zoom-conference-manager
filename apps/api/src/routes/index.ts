import express from 'express';
import seedDb from '../util/seedDb';
import resetDb from '../util/resetDb';

import eventRoute from './event';
import meetingRoute from './meeting';
import zoomUserRoute from './zoomUser';

const router = express.Router();

/// All routes here :
router.use('/events', eventRoute);
router.use('/meetings', meetingRoute);
router.use('/zoom-users', zoomUserRoute);

router.post('/seed', async (req, res) => {
  await seedDb();
  res.send('Database seeded');
});

router.post('/reset', async (req, res) => {
  await resetDb();
  res.send('Database reset');
});

export default router;
