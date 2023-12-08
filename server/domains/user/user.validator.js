import * as Yup from 'yup';

// Crear un esquema de validación
// Creando el esquema de validación
const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required('Se requiere ingresar nombre'),
  lastname: Yup.string().required('Se requiere ingresar apellido'),
  studentCode: Yup.string().required('Se requiere ingresar un codigo valido'),
  grade: Yup.string().required('Se requiere ingresar un grado valido'),
  section: Yup.string().required('Se requiere ingresar una sección valida'),
});

const signUpGetter = (req) => {
  // Desestructuramos la informacion
  // Se regresa el objeto signup
  // eslint-disable-next-line object-curly-newline
  const { firstName, lastname, studentCode, grade, section } = req.body;
  return {
    firstName,
    lastname,
    studentCode,
    grade,
    section,
  };
};

const signUp = {
  schema: signUpSchema,
  getObject: signUpGetter,
};

export default { signUp };
