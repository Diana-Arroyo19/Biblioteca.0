import { Router } from 'express';
import bookController from './book.controller';

import ValidateFactory from '../../services/validateFactory';
import bookValidator from './book.validator';

const router = new Router();

// Rutas

router.get(['/', '/dashboard'], bookController.showDashboard);

router.get(['/add-form', '/add'], bookController.addForm);
// DELETE "/book/:id"
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
router.post('/searchBooks', bookController.searchBooks);
router.delete('/:id', bookController.deleteBook);

// Exporto este tramo de ruta
export default router;
