import log from '../../config/winston';
// Importando el modelo
import BookModel from './book.model';

// GET '/project/showDashboard'
const showDashboard = async (req, res) => {
  // Consultado todos los proyectos
  const projects = await BookModel.find({}).lean().exec();
  // Enviando los proyectos al cliente en JSON
  res.render('book/dashboardView', { projects });
};
// GET '/project/addForm'
const addForm = (req, res) => {
  res.render('book/addView');
};

// POST "/project/add"
const addBook = async (req, res) => {
  // Rescatando la info del formulario
  // Rescatando la info del formulario
  const { errorData: validationError } = req;
  // En caso de haber error
  // se le informa al cliente
  if (validationError) {
    log.info('Se entrega al cliente error de validación de add Project');
    // Se desestructuran los datos de validación
    // y se renombran de  "value" a "project"
    const { value: book } = validationError;
    // Se extraen los campos que fallaron en la validación
    const errorModel = validationError.inner.reduce((prev, curr) => {
      // Creando una variable temporal para
      // evitar el error "no-param-reassing"
      const workingPrev = prev;
      workingPrev[`${curr.path}`] = curr.message;
      return workingPrev;
    }, {});
    return res.status(422).render('book/addView', { book, errorModel });
  }
  // En caso de que pase la validación
  // Se desestructura la información
  // de la peticion
  const { validData: book } = req;
  // Creando la instancia de un documento
  // con los valores de 'project'
  const bookDocument = new BookModel(book);
  try {
    // Se salva el documento en la colección correspondiente
    const savedBook = await bookDocument.save();
    // Se contesta la información del proyecto al cliente
    log.info('Se entrega al cliente información del proyecto cargado');
    return res.status(200).json(savedBook);
  } catch (error) {
    log.error(
      'ln 56 project.controller: Error al guardar proyecto en la base de datos',
    );
    return res.status(500).json(error);
  }
};

// DELETE "/project/:id"
const deleteBook = async (req, res) => {
  // Extrayendo el id de los parametros
  const { id } = req.params;
  // Usando el modelo para borrar el proyecto
  try {
    const result = await BookModel.findByIdAndRemove(id);
    // Agregando mensaje de flash
    req.flash('successMessage', 'Proyecto borrado con exito');
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
// Controlador Home
export default {
  showDashboard,
  addForm,
  addBook,
  deleteBook,
};
