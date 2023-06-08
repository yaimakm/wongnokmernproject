import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import { Product } from '../models/Product.js';
import { Stats } from '../models/Stats.js';
import getDataUri from '../utils/dataUri.js';
import ErrorHandler from '../utils/errorHandler.js';
import cloudinary from 'cloudinary';

export const getAllProducts = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || '';
  const category = req.query.category || '';

  const products = await Product.find({
    title: {
      $regex: keyword,
      $options: 'i',
    },
    category: {
      $regex: category,
      $options: 'i',
    },
  });
  res.status(200).json({
    success: true,
    products,
  });
});

export const createProduct = catchAsyncError(async (req, res, next) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category)
    return next(new ErrorHandler('Please add all fields', 400));

  const file = req.file;
  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Product.create({
    title,
    description,
    category,
    poster: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: 'Product created Successfully',
  });
});
export const getSomeProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler('Product not found', 404));

  product.views += 1;
  await product.save();

  res.status(200).json({
    success: true,
    product,
  });
});

export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;

  // Delete the product from the database
  await Product.findByIdAndDelete(productId);

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

Product.watch().on('change', async () => {
  const stats = await Stats.find({}).sort({ createdAt: 'desc' }).limit(1);

  const products = await Product.find({});

  let totalViews = 0;

  for (let i = 0; i < products.length; i++) {
    totalViews += products[i].views;
  }
  stats[0].views = totalViews;
  stats[0].createdAt = new Date(Date.now());

  await stats[0].save();
});
