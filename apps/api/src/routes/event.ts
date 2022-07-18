import express from 'express';
import multer from './routerLoaders/multer';

import {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  uploadFile,
} from '../controllers/event';
import response from '../util/response';

const router = express.Router();

router.get('/', response(getAllEvents));
router.post('/', response(createEvent));
router.get('/:id', response(getEvent));
router.put('/:id', response(updateEvent));
router.delete('/:id', response(deleteEvent));
router.post('/:id/upload', multer.single('excelFile'), response(uploadFile));

export default router;
