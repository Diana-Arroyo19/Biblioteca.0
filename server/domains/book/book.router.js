// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import bookController from './book.controller';

// Creando una isntancia del enrutador
const router = new Router();

// Enrutamos
// GET '//'
// GET '/book/dashboard'
router.get(['/', '/dashboard'], bookController.showDashboard);
// GET '/book/add-form'
// GET '/book/add'
router.get(['/add-form', '/add'], bookController.addForm);
// DELETE "/book/:id"
router.delete('/:id', bookController.deleteBook);
// POST "/project/add"
router.post('/add', bookController.addBook);

// Exporto este tramo de ruta
export default router;
