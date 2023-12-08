import log from '../../config/winston';
import BookModel from './book.model';

const addBook = async (req, res) => {
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
    // Se informa al cliente que se guardo el proyecto
    log.info(`Se carga proyecto ${savedBook}`);
    // Se registra en el log el redireccionamiento
    log.info('Se redirecciona el sistema a /project');
    // Se redirecciona el sistema a la ruta '/project'
    return res.redirect('/book');
  } catch (error) {
    log.error(
      'ln 56 project.controller: Error al guardar proyecto en la base de datos',
    );
    return res.status(500).json(error);
  }
};

const addForm = (req, res) => {
  res.render('book/addView');
};

const edit = async (req, res) => {
  // Extrayendo el id por medio de los parametros de url
  const { id } = req.params;
  // Buscando en la base de datos
  try {
    log.info(`Se inicia la busqueda del proyecto con el id: ${id}`);
    const book = await BookModel.findOne({ _id: id }).lean().exec();
    if (book === null) {
      log.info(`No se encontro el proyecto con el id: ${id}`);
      return res
        .status(404)
        .json({ fail: `No se encontro el proyecto con el id: ${id}` });
    }
    // Se manda a renderizar la vista de edición
    log.info(`Proyecto encontrado con el id: ${id}`);
    return res.render('book/editView', { book });
  } catch (error) {
    log.error('Ocurre un error en: metodo "error" de project.controller');
    return res.status(500).json(error);
  }
};

const editPut = async (req, res) => {
  const { id } = req.params;
  // Rescatando la info del formulario
  const { errorData: validationError } = req;
  // En caso de haber error
  // se le informa al cliente
  if (validationError) {
    log.info(`Error de validación del proyecto con id: ${id}`);
    // Se desestructuran los datos de validación
    const { value: book } = validationError;
    // Se extraen los campos que fallaron en la validación
    const errorModel = validationError.inner.reduce((prev, curr) => {
      // Creando una variable temporal para
      // evitar el error "no-param-reassing"
      const workingPrev = prev;
      workingPrev[`${curr.path}`] = curr.message;
      return workingPrev;
    }, {});
    return res.status(422).render('book/editView', { book, errorModel });
  }
  // Si no hay error
  const book = await BookModel.findOne({ _id: id });
  if (book === null) {
    log.info(`No se encontro documento para actualizar con id: ${id}`);
    return res
      .status(404)
      .send(`No se encontro documento para actualizar con id: ${id}`);
  }
  // En caso de encontrarse el documento se actualizan los datos
  const { validData: newBook } = req;
  book.image = newBook.image;
  book.title = newBook.title;
  book.author = newBook.author;
  book.category = newBook.category;
  book.isbn = newBook.isbn;
  book.copiesAvailable = newBook.copiesAvailable;
  book.description = newBook.description;
  try {
    // Se salvan los cambios
    log.info(`Actualizando proyecto con id: ${id}`);
    await book.save();
    // Generando mensaje FLASH
    req.flash('successMessage', 'Proyecto editado con exito');
    return res.redirect('/book');
  } catch (error) {
    log.error(`Error al actualizar proyecto con id: ${id}`);
    return res.status(500).json(error);
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  // Usando el modelo para borrar el proyecto
  try {
    const result = await BookModel.findByIdAndRemove(id);
    // Agregando mensaje de flash
    req.flash('successMessage', 'Libro borrado con exito');
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const filterBooks = (books, query, filterKey) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  books.filter((book) => book[filterKey].includes(query));

const searchBooks = async (req, res) => {
  try {
    // Acceder al valor de 'Android' en req.body.query y almacenarlo en una variable
    const valorQuery = req.body.query;
    // Consultado todos los libros
    const allBooks = await BookModel.find({}).lean().exec();
    // Definir las claves de filtrado
    const filterKeys = ['title', 'author', 'category'];
    // Filtrar por título, autor y categoría usando la función filterBooks
    const filteredBooks = filterKeys.reduce(
      (filtered, key) => [
        ...filtered,
        ...filterBooks(allBooks, valorQuery, key),
      ],
      [],
    );
    // Enviando los proyectos al cliente en JSON
    res.render('book/dashboardView', { books: filteredBooks });
  } catch (error) {
    // Manejar errores de manera adecuada
    console.error(error);
    res.status(500).send('Error en la búsqueda de libros');
  }
};

const showDashboard = async (req, res) => {
  // Consultado todos los proyectos
  const books = await BookModel.find({}).lean().exec();
  // Enviando los proyectos al cliente en JSON
  res.render('book/dashboardView', { books });
};

// Controlador Home
export default {
  addBook,
  addForm,
  deleteBook,
  edit,
  editPut,
  searchBooks,
  showDashboard,
};
