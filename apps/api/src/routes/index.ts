import express from 'express';
import { apiTest } from '../controllers';

const router = express.Router();

/// All routes here :
router.get('/test', apiTest);

export default router;
