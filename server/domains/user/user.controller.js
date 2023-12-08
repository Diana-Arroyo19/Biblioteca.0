import log from '../../config/winston';
import User from './user.model';

// GET '/user/login'
const login = (req, res) => {
  // Sirve el formulario de login
  res.render('user/login');
};
// GET '/user/logout'
const logout = (req, res) => {
  res.send("🚧 Under Construction '/user/logout' 🚧");
};

// GET '/user/register'
const register = (req, res) => {
  res.render('user/register');
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
    // mendiante la funcion create del modelo
    const user = await User.create(userFormData);
    log.info(`Usuario creado: ${JSON.stringify(user)}`);
    // 3. Se contesta al cliente con el usuario creado
    return res.status(200).json(user.toJSON());
  } catch (error) {
    log.error(error);
    return res.json({ message: error.message });
  }
};

// Controlador Home
export default {
  login,
  logout,
  register,
  registerPost,
};
