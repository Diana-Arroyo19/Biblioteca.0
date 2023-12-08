import { Router } from 'express';
import reportController from './report.controller';

const router = new Router();
router.get(['/download'], reportController.report);
export default router;
