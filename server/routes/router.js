// Importando enrutador home
import homeRouter from '../domains/home/home.router';
import userRouter from '../domains/user/user.router';
import aboutRouter from '../domains/about/about.router';
import projectRouter from '../domains/book/book.router';
import reportRouter from '../domains/reports/report.router';
import finesRouter from '../domains/fines/fines.router';
import loansRouter from '../domains/loans/loans.router';

// Función que agrega rutas
const addRoutes = (app) => {
  // Agregando enrutado de Home
  app.use('/', homeRouter);
  app.use('/user', userRouter);
  app.use('/about', aboutRouter);
  app.use('/book', projectRouter);
  app.use('/report', reportRouter);
  app.use('/fines', finesRouter);
  app.use('/loans', loansRouter);
  return app;
};

// Exportando objeto
export default { addRoutes };
