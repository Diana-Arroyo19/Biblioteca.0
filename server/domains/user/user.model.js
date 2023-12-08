import mongoose from 'mongoose';

const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  studenCode: {
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
});
export default mongoose.model('user', UserSchema);
