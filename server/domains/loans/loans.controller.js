import UserModel from '../user/user.model';
import log from '../../config/winston';
import BookModel from '../book/book.model';
import LoansModel from './loans.model';

const loans = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findOne({ _id: id }).lean().exec();
    return res.render('loans/loans', { book });
  } catch (error) {
    log.error('Ocurre un error en: metodo "error" de project.controller');
    return res.status(500).json(error);
  }
};

const loansAction = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentCode } = req.body;

    // Buscar usuario y libro
    const user = await UserModel.findOne({ studentCode }).lean().exec();
    const book = await BookModel.findOne({ _id: id });

    if (!user) {
      console.log('No se encontró el estudiante');
      return res.render('loans/loans');
    }

    if (book && book.copiesAvailable > 0) {
      // Generar reserva del libro
      // eslint-disable-next-line object-curly-newline
      const currentDate = Date.now();
      const { title, author, isbn } = book;
      const loansDocument = new LoansModel({
        title,
        author,
        isbn,
        studentCode,
        reservationDay: currentDate.toString(),
        deliveryDay: (currentDate + 864000000).toString(),
        quantity: 1,
      });
      try {
        // Guardar la reserva
        const savedLoans = await loansDocument.save();
        log.info(`Se carga la reserva ${savedLoans}`);

        // Actualizar registro de libro
        book.copiesAvailable -= 1;
        await book.save();

        // Redireccionar a la ruta '/book'
        log.info('Se redirecciona el sistema a /book');
        return res.redirect('/book');
      } catch (error) {
        log.error('Error al guardar reserva en la base de datos', error);
        return res.render('error');
      }
    } else {
      console.log('No hay copias disponibles del libro');
      return res.render('error');
    }
  } catch (error) {
    log.error('Ocurrió un error en loansAction', error);
    return res.render('error');
  }
};

const returns = (req, res) => {
  res.render('book/addView');
};

export default {
  loans,
  loansAction,
  returns,
};
