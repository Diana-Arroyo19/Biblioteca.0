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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  },
};
export default mongoose.model('users', UserSchema);
