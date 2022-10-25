const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");

//requiring categoryModel
const categoryModel = require("../models/category");

const getCategory = catchAsync(async (req, res, next) => {
  let filter = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"]; //it ignores page sort limit and fields in query
  excludeFields.forEach((el) => {
    delete filter[el];
  });
  // console.log(filter);
  const query = categoryModel.find(filter);
  const data = await query;
  if (!data) {
    return next(new AppError("Cannot find the category Error...", 400));
  }
  res.status(200).json({
    status: "success",
    message: "All category ",
    data,
  });
});

//for storing image file in database

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/category");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const uploadOptions = multer({ storage: storage });

//post request on category  /category
const postCategory = catchAsync(async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next(new AppError("Image section not found ", 400));
  }
  const { name, icon, color } = req.body;
  const filename = req.file.filename;
  const saveData = await categoryModel.create({
    name,
    icon,
    color,
    image: `${req.protocol}://${req.get("host")}/uploads/category/${filename}`,
  });
  if (!saveData) {
    return next(new AppError("Error finding category ", 400));
  }
  res.status(200).json({
    status: "success",
    data: saveData,
  });
});

//delete category by id delete request   /category/:id
const deleteCategory = catchAsync(async (req, res, next) => {
  const data = await categoryModel.findByIdAndDelete(req.params.id);
  if (!data) {
    return next(new AppError("Cannot find the category to delete", 400));
  }
  res.status(200).json({
    status: "success",
    data,
    message: "category deleted ",
  });
});

//update category  put -request  /category/:id
const updateCategory = catchAsync(async (req, res, next) => {
  const updateData = await categoryModel.findById(req.params.id);
  const file = req.file;
  let imagePath;
  if (file) {
    const filename = req.file.filename;
    imagePath = `${req.protocol}://${req.get(
      "host"
    )}/uploads/category/${filename}`;
  } else {
    imagePath = updateData.image;
  }

  const data = await categoryModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
        image: imagePath,
      },
    },
    { new: true }
  );
  if (!data) {
    return next(new AppError("Cannot update invalid id ", 400));
  }
  res.status(202).json({
    status: "success",
    data,
    message: "Category updated ",
  });
});
//get request /category/:id
const getCategoryById = catchAsync(async (req, res, next) => {
  const data = await categoryModel.findById(req.params.id);
  if (!data) {
    return next(new AppError("Cannot find the category with given id ", 400));
  }
  res.status(200).json({
    status: "success",
    message: "category with id only ",
    data,
  });
});

module.exports = {
  getCategory,
  postCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
  uploadOptions,
};
