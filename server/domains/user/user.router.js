import { Router } from 'express';
import userController from './user.controller';
import userValidator from './user.validator';
import ValidateFactory from '../../services/validateFactory';
// Importando middleware de autenticación passport
// de estrategia local
import { authLocal } from '../../services/auth.services';

const router = new Router();

// Rutas
router.get('/register', userController.register);
router.get('/search', userController.searchUser);
router.post(
  '/register',
  ValidateFactory(userValidator.signUp),
  userController.registerPost,
);
router.put(
  '/edit/:id',
  ValidateFactory(userValidator.signUp),
  userController.editPut,
);
router.post('/registerPost', userController.searchUserPost);

// POST user/login
router.post('/login', authLocal);
export default router;
