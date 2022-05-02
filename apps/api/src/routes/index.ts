import * as express from 'express';
import { apiTest } from '../controllers';

const router = express.Router()

/// All routes here :
router.post('/test', apiTest);


export default router;