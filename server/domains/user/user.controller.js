// Action Methods

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

// Controlador Home
export default {
  login,
  logout,
  register,
};
