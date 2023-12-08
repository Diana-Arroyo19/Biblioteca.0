import { Router } from 'express';
import bookController from './book.controller';
import ValidateFactory from '../../services/validateFactory';
import bookValidator from './book.validator';

const router = new Router();

// Rutas
router.get(['/', '/dashboard'], bookController.showDashboard);
router.get(['/add-form', '/add'], bookController.addForm);
router.get('/edit/:id', bookController.edit);
router.post(
  '/add',
  ValidateFactory({
    schema: bookValidator.bookSchema,
    getObject: bookValidator.getBook,
  }),
  bookController.addBook,
);
router.post('/searchBooks', bookController.searchBooks);
router.put(
  '/edit/:id',
  ValidateFactory({
    schema: bookValidator.bookSchema,
    getObject: bookValidator.getBook,
  }),
  bookController.editPut,
);
router.delete('/:id', bookController.deleteBook);

export default router;
