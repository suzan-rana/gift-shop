const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const productModel = require("../models/products");
const categoryModel = require("../models/category");
const multer = require("multer");
const { default: mongoose } = require("mongoose");

//for saving data to the database
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/products");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const uploadOptions = multer({ storage: storage });

//get all product items get request -- /prouduct
const getAllProduct = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };

  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => {
    delete queryObj[el];
  });

  //sorting
  let querydata = productModel.find(queryObj).populate("category");
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    querydata = querydata.sort(sortBy);
  }
  //paging limiting
  if (req.query.limit) {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    querydata = querydata.skip(skip).limit(limit);
  }

  //selecting some element
  if (req.query.fields) {
    const field = req.query.fields.split(",").join(" ");
    querydata = querydata.select(field);
  }

  const data = await querydata;

  if (!data) {
    return next(new AppError("Cannot find all product Error occured ", 400));
  }
  // res.status(200).json({
  //   status: "success",
  //   result: data.length,
  //   message: "all Product data ",
  //   data,
  // });
  res.status(200).json(data);
});

//post request on product item
// post request --/product
const postProduct = catchAsync(async (req, res, next) => {
  const filename = req.file.filename;
  const categorydata = await categoryModel.findById(req.body.category);
  if (!categorydata) {
    return next(new AppError("Invalid Category ", 400));
  }

  const {
    name,
    description,
    richDescription,
    image,
    images,
    brand,
    price,
    category,
    countInStock,
    rating,
    isFeatured,
  } = req.body;
  const data = await productModel.create({
    name,
    description,
    richDescription,
    image: `${req.protocol}://${req.get("host")}/uploads/products/${filename}`,
    images,
    brand,
    price,
    category,
    countInStock,
    rating,
    isFeatured,
  });
  if (!data) {
    return next(new AppError("Cannot find the data for the prooduct ", 400));
  }
  res.status(200).json({
    status: "success",
    message: "data Posted",
    data,
  });
});

//update producct by id  put request /product/:id
const updateProduct = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new AppError("Invalid product id ", 400));
  }
  const categoryData = await categoryModel.findById(req.body.category);
  if (!categoryData) {
    return next(
      new AppError("Cannot find the category id cannot update ", 400)
    );
  }
  const productData = await productModel.findById(req.params.id);
  if (!productData) {
    return next(new AppError("Invalid product", 400));
  }
  let imageFileName;
  if (req.file) {
    imageFileName = `${req.protocol}://${req.get("host")}/uploads/products/${
      req.file.filename
    }`;
  } else {
    imageFileName = productData.image;
  }

  const {
    name,
    description,
    richDescription,
    image,
    images,
    brand,
    price,
    category,
    countInStock,
    rating,
    isFeatured,
  } = req.body;
  const data = await productModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      richDescription,
      image: imageFileName,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      isFeatured,
    },
    { new: true }
  );
  if (!data) {
    return next(new AppError("Cannot update invalid product  id ", 400));
  }
  res.status(202).json({
    status: "success",
    data,
    message: "Product updated ",
  });
});

//delete product by id
// delete request /product/:id
const deleteProduct = catchAsync(async (req, res, next) => {
  const data = await productModel.findByIdAndDelete(req.params.id);
  if (!data) {
    return next(new AppError("Cannot find the id to delete the product ", 400));
  }
  res.status(200).json({
    status: "success",
    message: "product Deleted",
    data,
  });
});

//get product by id
//get request--/product/:id
const getProductById = catchAsync(async (req, res, next) => {
  const data = await productModel.findById(req.params.id).populate();
  if (!data) {
    return next(new AppError("cannot find the product with given id ", 400));
  }
  res.status(200).json({
    status: "success",
    message: "Product with id ",
    data,
  });
});
//get product name image and price only
const getProductNameImagePrice = catchAsync(async (req, res, next) => {
  const data = await productModel.find().select("name image price -_id");
  if (!data) {
    return next(new AppError("Error occured during getting item", 500));
  }
  res.status(200).json({
    status: "success",
    data,
  });
});
//get product name description only

const getProductNameDescription = catchAsync(async (req, res, next) => {
  const data = await productModel.find().select("name description -_id");
  if (!data) {
    return next(new AppError("Error occured during getting item", 500));
  }
  res.status(200).json({
    status: "success",
    data,
  });
});

//get product and count total product
// /get/count
const getProductAndCount = catchAsync(async (req, res, next) => {
  const data = await productModel.find().countDocuments((count) => count);
  if (!data) {
    return next(new AppError("Not found valid count item ", 500));
  }
  res.status(200).json({
    status: "success",
    count: data,
  });
});

//getfeatured
///product/get/featured
const getFeaturedProduct = catchAsync(async (req, res, next) => {
  const data = await productModel.find({ isFeatured: true });
  if (!data) {
    return next(new AppError("Cannot find featured product ", 400));
  }
  res.status(200).json({
    status: "success",
    result: data.length,
    message: "featured product ",
    data,
  });
});

//get featured product and count
const getFeaturedCount = catchAsync(async (req, res, next) => {
  const count = req.params.count ? req.params.count : 0;
  const data = await productModel.find({ isFeatured: true }).limit(+count);
  if (!data) {
    return next(new AppError("Cannot find featured count proudct ", 400));
  }
  res.status(200).json({
    status: "success",
    message: `Featured product with ${count}count `,
    data,
  });
});

module.exports = {
  getAllProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductNameImagePrice,
  getProductNameDescription,
  getProductAndCount,
  getFeaturedProduct,
  getFeaturedCount,
  uploadOptions,
};
