// Importando biblioteca de validacion
import * as Yup from 'yup';

// Creando un esquema de validación para el proyecto
const bookSchema = Yup.object().shape({
  image: Yup.string().required('Se requiere una imagen de libro'),
  title: Yup.string().required('Se requiere un titulo de libro'),
  author: Yup.string().required('Se requiere un autor de libro'),
  category: Yup.string().required('Se requiere una categoria de libro'),
  isbn: Yup.string().required('Se requiere un ISBN de libro'),
  copiesAvailable: Yup.string().required('Se requieren las copias de libro'),
  description: Yup.string()
    .max(5000, 'No escribir mas de 5000 caracteres')
    .required('Se requiere una descripción del libro'),
});

// Creando el extractor de datos de la petición
const getBook = (req) => {
  // Extrayendo datos de la petición
  // eslint-disable-next-line object-curly-newline, prettier/prettier
  const { image, title, author, category, isbn, copiesAvailable, description } = req.body;
  // Regresando el objeto proyecto
  return {
    image,
    title,
    author,
    category,
    isbn,
    copiesAvailable,
    description,
  };
};

export default {
  bookSchema,
  getBook,
};
