import mongoose from 'mongoose';

const { Schema } = mongoose;
const LoansSchema = new Schema({
  studentCode: {
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
  isbn: {
    type: String,
    required: true,
  },
  reservationDay: {
    type: String,
    required: true,
  },
  deliveryDay: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
export default mongoose.model('loans', LoansSchema);
