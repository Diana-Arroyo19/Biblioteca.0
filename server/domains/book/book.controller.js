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
const addBook = (req, res) => {
  res.status(200).json(req.body);
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
  deleteBook,
  addBook,
};
