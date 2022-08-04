import express from 'express';
import {
  getAllZoomUsers,
  createZoomUser,
  deleteZoomUser,
} from '../controllers/zoomUser';

import response from '../util/response';

const router = express.Router();

router.get('/', response(getAllZoomUsers));
router.post('/', response(createZoomUser));
router.delete('/:id', response(deleteZoomUser));

export default router;
