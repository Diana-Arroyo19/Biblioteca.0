#!/usr/bin/env node

// Module that allows to communicate with a client
// usign HTTP protocol
import http from 'http';
// Importing the server logic
// require is used to import code from an external file
import app from '../app';

// Importing winston logger
import log from '../config/winston';

// Importing configuration keys
import configKeys from '../config/configKeys';

// Importing db connection function
import connectWithRetry from '../database/mongooseConnection';

/**
 * Create HTTP server.
 */

log.info('The server is created from the express instance');
const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || configKeys.PORT);
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log.error(`${bind} requires elevated privileges`);
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.error(`${bind} is already in use`);
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  log.info(`⭐⭐ Listening on ${process.env.APP_URL}:${addr.port} ⭐⭐`);
}

// Launching db connection
connectWithRetry(configKeys.MONGO_URL);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
