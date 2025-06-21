import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    1. Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT; // set to 8 or 12 later
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword 
  ? { name: { $regex: req.query.keyword, $options: 'i' } } 
  : {};
  const count = await Product.countDocuments({...keyword});

  const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({products, page, pages: Math.ceil(count / pageSize)});
});

// @desc    2. Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    3. Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Product name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Product brand',
    category: 'Product category',
    countInStock: 0,
    numReviews: 0,
    description: 'Product description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    4. Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock, reviews } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.reviews = reviews;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    5. Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product Deleted' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    6. Create a review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    );

    if(alreadyReviewed) {
      res.status(404);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

    await product.save();
    res.status(200).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    7. Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({rating: -1}).limit(3);

  res.status(200).json(products);
});

export { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts
};