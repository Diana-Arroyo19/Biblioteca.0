// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import aboutController from './about.controller';

// Creando una isntancia del enrutador
const router = new Router();

router.get('/', aboutController.about);

// Exporto este tramo de ruta
export default router;
