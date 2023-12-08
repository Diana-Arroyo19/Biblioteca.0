import path from 'path';

const report = (req, res) => {
  // Ruta al archivo PDF en el servidor
  const pdfPath = path.join(__dirname, '../../../public/document/download_money.pdf');
  console.log(pdfPath);
  // Establecer el encabezado para indicar la descarga de un archivo
  res.setHeader('Content-Disposition', 'attachment; pasemepofabo.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  // Enviar el archivo como respuesta
  res.download(pdfPath, (err) => {
    if (err) {
      // Manejar errores, si los hay
      console.error(err);
      res.status(500).send('Error al descargar el archivo.');
    }
  });
};

export default {
  report,
};
