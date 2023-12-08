import log from '../../config/winston';
import UserModel from './user.model';

const editPut = async (req, res) => {
  const { id } = req.params;
  // Rescatando la info del formulario
  const { errorData: validationError } = req;
  // En caso de haber error
  // se le informa al cliente
  if (validationError) {
    log.info(`Error de validación del proyecto con id: ${id}`);
    // Se desestructuran los datos de validación
    const { value: user } = validationError;
    // Se extraen los campos que fallaron en la validación
    const errorModel = validationError.inner.reduce((prev, curr) => {
      // Creando una variable temporal para
      // evitar el error "no-param-reassing"
      const workingPrev = prev;
      workingPrev[`${curr.path}`] = curr.message;
      return workingPrev;
    }, {});
    return res.status(422).render('user/edit', { user, errorModel });
  }
  // Si no hay error
  const user = await UserModel.findOne({ _id: id });
  if (user === null) {
    log.info(`No se encontro documento para actualizar con id: ${id}`);
    return res
      .status(404)
      .send(`No se encontro documento para actualizar con id: ${id}`);
  }
  // En caso de encontrarse el documento se actualizan los datos
  const { validData: newUser } = req;
  user.fullname = newUser.fullname;
  user.studentCode = newUser.studentCode;
  user.grade = newUser.grade;
  user.section = newUser.section;
  try {
    // Se salvan los cambios
    log.info(`Actualizando usuario con id: ${id}`);
    await user.save();
    // Generando mensaje FLASH
    req.flash('successMessage', 'Usuario editado con exito');
    return res.redirect('/user/search');
  } catch (error) {
    log.error(`Error al actualizar usuario con id: ${id}`);
    return res.status(500).json(error);
  }
};

// GET '/user/register'
const register = (req, res) => {
  res.render('user/register');
};

// GET user/confirm/<token>
const confirm = async (req, res) => {
  // Extrayendo datos de validación
  const { validData, errorData } = req;
  if (errorData) return res.json(errorData);
  const { token } = validData;
  // Buscando si existe un usuario con ese token
  const user = await UserModel.findByToken(token);
  if (!user) {
    return res.send('USER WITH TOKEN NOT FOUND');
  }
  // Activate user
  await user.activate();
  // Retornado al usuario validado
  return res.send(`Usuario: ${user.firstName} Validado`);
};

// POST '/user/register'
const registerPost = async (req, res) => {
  const { validData: userFormData, errorData } = req;
  log.info('Se procesa formulario de registro');
  // Verificando si hay errores
  if (errorData) {
    return res.json(errorData);
  }
  // En caso de no haber errores, se crea el usuario
  try {
    // 1. Se crea una instancia del modelo User
    // mediante la función create del modelo
    const user = await UserModel.create(userFormData);
    log.info(`Usuario creado: ${JSON.stringify(user)}`);
    // 3. Se contesta al cliente con el usuario creado
    // Se construye el viewModel del usuario
    const viewModel = {
      ...user.toJSON(),
      // Color de fondo
      backgroundColor: 'cyan darken-2',
    };
    log.info('Se manda a renderizar la vista "successfulRegistration.hbs"');
    return res.render('user/successfulRegistration', viewModel);
  } catch (error) {
    log.error(error);
    return res.json({ message: error.message });
  }
};

const searchUser = async (req, res) => {
  res.render('user/search');
};

const searchUserPost = async (req, res) => {
  const { studentData, searchOption } = req.body;
  let query;
  if (searchOption === '1') {
    console.log('Está buscando por nombre de estudiante');
    query = { fullname: studentData };
  } else if (searchOption === '2') {
    console.log('Está buscando por código de estudiante');
    query = { studentCode: studentData };
  } else {
    return res.status(400).json({ error: 'Opción de búsqueda no válida.' });
  }
  try {
    const user = await UserModel.findOne(query).lean().exec();
    if (user === null) {
      return res.render('user/userNotFound');
    }
    return res.render('user/edit', { user });
  } catch (error) {
    console.error('Error al buscar al estudiante:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// GET '/user/logout'
const logout = (req, res) => {
  res.send("🚧 UNDER CONSTRUCTION GET  '/user/logout' 🚧");
  // Passport incrusta en la petición el
  // método logout aqui se ejecuta
  // REF: https://www.passportjs.org/concepts/authentication/logout/
  req.logout((err) => {
    if (err) {
      return res.json(err);
    }
    // Creamos mensaje de flash
    req.flash('successMessage', 'Ha cerrado sesión correctamente');
    // Redireccionamos al login
    return res.redirect('/user/login');
  });
};

// Controlador Home
export default {
  editPut,
  register,
  registerPost,
  searchUser,
  searchUserPost,
  confirm,
  logout,
};
