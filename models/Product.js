import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter product title'],
    minLength: [4, 'Title must be at least 4 characters'],
    maxLength: [80, "Title can't exceed 80 characters"],
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
    minLength: [20, 'Title must be at least 20 characters'],
  },
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product = mongoose.model('Product', schema);
