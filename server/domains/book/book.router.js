// Importando el Router de Express
import { Router } from 'express';
// Importando el controlador
import bookController from './book.controller';

// Importando factory de validación
import ValidateFactory from '../../services/validateFactory';
// Importando el validador de proyectos
import bookValidator from './book.validator';

// Creando una isntancia del enrutador
const router = new Router();

// Enrutamos
// GET '/book/'
// GET '/book/dashboard'
router.get(['/', '/dashboard'], bookController.showDashboard);
// GET '/book/add-form'
// GET '/book/add'
router.get(['/add-form', '/add'], bookController.addForm);
// DELETE "/book/:id"
router.delete('/:id', bookController.deleteBook);
// POST "/project/add"
router.post('/add', bookController.addBook);
router.post(
  '/add',
  ValidateFactory({
    schema: bookValidator.bookSchema,
    getObject: bookValidator.getBook,
  }),
  bookController.addBook,
);

// Exporto este tramo de ruta
export default router;
