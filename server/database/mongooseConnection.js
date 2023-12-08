import mongoose from 'mongoose';
import log from '../config/winston';

// Creando la función de conexión
export default async function connectWithRetry(mongoUrl) {
  try {
    await mongoose.connect(mongoUrl);
    log.info('🟢 Conectando a MongoDB');
  } catch (error) {
    log.error(`💔 No se logró la conexión a la db 💔: ${error.message}`);
    log.error('Intentando la conexión en 20 segundos');
    setTimeout(() => connectWithRetry(mongoUrl), 20000);
  }
}
