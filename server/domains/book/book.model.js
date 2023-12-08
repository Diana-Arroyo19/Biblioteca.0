import mongoose from 'mongoose';

const { Schema } = mongoose;
const BookSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  copiesAvailable: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
export default mongoose.model('book', BookSchema);
