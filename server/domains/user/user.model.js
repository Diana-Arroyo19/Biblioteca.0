import mongoose from 'mongoose';

const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    fullname: { type: String, required: true },
    studentCode: {
      type: Number,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    // Agrega una propiedad que identifica el rol del usuario como user o admin
    role: {
      type: String,
      enum: ['user', 'admin'],
      message: '{VALUE} no es un rol valido',
      default: 'user',
    },
  },
  { timestamps: true },
);

//  Asignando metodos de instancia
UserSchema.methods = {
  // Funcion de tranformacion a Json personalizada
  toJSON() {
    return {
      id: this._id,
      fullname: this.fullname,
      studentCode: this.studentCode,
      grade: this.grade,
      section: this.section,
      role: this.role,
      mail: this.mail,
      emailConfirmationToken: this.emailConfirmationToken,
      emailConfirmationAt: this.emailConfirmationAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  },
};

export default mongoose.model('users', UserSchema);
