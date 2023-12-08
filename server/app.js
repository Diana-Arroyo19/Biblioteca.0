// Helps to handle http errors
import createError from 'http-errors';
// Import the Express Library
import express from 'express';
// Enable post and delete verbs
import methodOverride from 'method-override';
// Is a Core-Node library to manage system paths
import path from 'path';
// Helps to parse client cookies
import cookieParser from 'cookie-parser';
// Library to log http communication
import morgan from 'morgan';
// Setting Webpack Modules
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
// Importing template-engine
import configTemplateEngine from './config/templateEngine';
// Importing subroutes
import indexRouter from './routes/index';
import usersRouter from './routes/users';
// Importing webpack configuration
import webpackConfig from '../webpack.dev.config';

// Importando configurador de sesiones
import configSession from './config/configSessions';
// Impornting winston logger
import log from './config/winston';
// Importando enrutador
import router from './routes/router';
// Creando variable del directorio raiz
// eslint-disable-next-line
global['__rootdir'] = path.resolve(process.cwd());
// We are creating the express instance
const app = express();
// Get the execution mode
const nodeEnviroment = process.env.NODE_ENV || 'production';
// Deciding if we add webpack middleware or not
if (nodeEnviroment === 'development') {
  // Start Webpack dev server
  console.log('🛠️  Ejecutando en modo desarrollo');
  // Adding the key "mode" with its value "development"
  webpackConfig.mode = nodeEnviroment;
  // Setting the port
  webpackConfig.devServer.port = process.env.PORT;
  // Setting up the HMR (Hot Module Replacement)
  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackConfig.entry,
  ];
  // Creating the bundler
  const bundle = webpack(webpackConfig);
  // Enabling the webpack middleware
  app.use(
    WebpackDevMiddleware(bundle, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );
  //  Enabling the webpack HMR
  app.use(WebpackHotMiddleware(bundle));
} else {
  console.log('🏭 Ejecutando en modo producción 🏭');
}
// Configuring the template engine
configTemplateEngine(app);
// Registering middlewares
// Log all received requests
app.use(morgan('dev', { stream: log.stream }));
// Parse request data into json
app.use(express.json());
// Decode url info
app.use(express.urlencoded({ extended: false }));
// Parse client cookies into json
app.use(cookieParser());
// Enable post and delete verbs
app.use(methodOverride('_method'));
// Habilitando manejo de sesiones y mensajes flash
configSession(app);
// Set up the static file server
app.use(express.static(path.join(__dirname, '../public')));

// Registering routes
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
router.addRoutes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  log.info(`404 Pagina no encontrada ${req.method} ${req.originalUrl}`);
  next(createError(404));
});
// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  log.error(`${err.status || 500} - ${err.message}`);
  res.render('error');
});
export default app;
