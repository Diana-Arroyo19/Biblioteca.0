import { Router } from 'express';
import finesController from './fines.controller';

const router = new Router();
router.get(['/toList'], finesController.fines);
export default router;
