// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import userController from './project.controller';

// Creando una isntancia del enrutador
const router = new Router();

// Enrutamos
// GET '/project/'
// GET '/project/dashboard'
router.get(['/', '/dashboard'], userController.showDashboard);
// GET '/project/add-form'
// GET '/project/add'
router.get(['/add-form', '/add'], userController.addForm);

// Exporto este tramo de ruta
export default router;
