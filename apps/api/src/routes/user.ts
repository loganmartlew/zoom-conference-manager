import express from 'express';

import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user';

const router = express.Router();

router.get('/', getUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
