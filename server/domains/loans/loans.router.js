import { Router } from 'express';
import loansController from './loans.controller';

const router = new Router();

//  Rutas
router.get('/loans/:id', loansController.loans);
router.get('/return', loansController.returns);
router.get('/searchLoans', loansController.getLoans);
router.put('/loansAction/:id', loansController.loansAction);
router.delete('/:id', loansController.deleteLoan);

export default router;
