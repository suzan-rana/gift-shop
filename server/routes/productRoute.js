const express = require("express");
const router = express();
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

/**
 * @swagger
 * components:
 *  schemas:
 *   product:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      example: "Watch"
 *      required: true
 *      description: "Name of the product"
 *     description:
 *      type: string
 *      description: "Product describtion "
 *      example: "this product is easily available for this holiday sale .Grab Your sale fast"
 *      required: true
 *     richDescription:
 *      type: string
 *      example: "This product is home made Grab the opportunity and don't miss the chance ."
 *     image:
 *      type: file
 *      required: true
 *     images:
 *      type: file
 *     brand:
 *      type: string
 *     price:
 *      type: number
 *     category:
 *       type: string
 *       example: 234235_2532_2354kk
 *       description: " Need to provide the category id in which product lies "
 *       required: true
 *     countInStock:
 *      type: number
 *      example: 10
 *     rating:
 *      type: number
 *      example: 4.5
 *     isFeatured:
 *      type: boolean
 *      example: false
 */

/**
 * @swagger
 * /product:
 *  get:
 *   security:
 *    - Bearer: []
 *   tags:
 *    - Product
 *   summary: "For Getting all list of Product "
 *   description: Get all the product of specific category
 *   responses:
 *    200:
 *     description: "List of all product  "
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/product"
 *    400:
 *     description: "Error fetching product  "
 *
 *
 */

router.get(
  "/",
  authController.protectMiddleware,
  productController.getAllProduct
);

/**
 * @swagger
 * /product:
 *  post:
 *   security:
 *     - Bearer: []
 *   tags:
 *    - Product
 *   summary: "For posting new product of specific category   "
 *   description: Post the new product required category id and other credentials
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *        schema:
 *         type: object
 *         $ref: "#/components/schemas/product"
 *   responses:
 *    200:
 *     description: "List of all category "
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/product"
 *     400:
 *    description: "Error creating user "
 *
 *
 */
router.post(
  "/",
  authController.protectMiddleware,
  productController.uploadOptions.single("image"),
  productController.postProduct
);

/**
 * @swagger
 * /product/{id}:
 *  put:
 *   security:
 *    - Bearer: []
 *   tags:
 *    - Product
 *   summary: "To update the Product   "
 *   description: user can update the product  need to provide the category id and other credentals
 *   parameters:
 *   - name: id
 *     in: path
 *     description: Enter the specific product  id in parameter to update the product
 *     required: true
 *     schema:
 *      type: string
 *      example: 2345ei _892349kl_33
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *        schema:
 *         type: object
 *         $ref: "#/components/schemas/product"
 *   responses:
 *    202:
 *     description: "product updated "
 *     content:
 *      multipart/form-data:
 *       schema:
 *        $ref: "#/components/schemas/product"
 *     400:
 *      description: "Error updating product  "
 *
 *
 */
router.put(
  "/:id",
  // authController.protectMiddleware,
  productController.uploadOptions.single("image"),
  productController.updateProduct
);

/**
 * @swagger
 * /product/{id}:
 *  delete:
 *   security:
 *    - Bearer: []
 *   tags:
 *    - Product
 *   summary: "For Deleting the Selected Product  "
 *   description: Deleting Selected product
 *   parameters:
 *    - name: id
 *      in: path
 *      description: Entet the Product id in parameter to delete the selected product
 *      required: true
 *      schema:
 *       type: string
 *       example : "2343_2345r34wef23_34"
 *   responses:
 *    200:
 *     description: "Product of selected id Deleted  "
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/product"
 *    400:
 *     description: "Error occured"
 *
 *
 */
router.delete(
  "/:id",
  authController.protectMiddleware,
  productController.deleteProduct
);

/**
 * @swagger
 * /product/{id}:
 *  get:
 *   security:
 *    - Bearer: []
 *   tags:
 *    - Product
 *   summary: "For Getting all list of product of selected id  "
 *   description: Get all the category  listed
 *   parameters:
 *    - name: id
 *      in: path
 *      description: Entet the product  id in parameter to get only product  of selected id
 *      required: true
 *      schema:
 *       type: string
 *       example : "2343_2345r34wef23_34"
 *   responses:
 *    200:
 *     description: "List of selected product  "
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/product"
 *    400:
 *     description: "Error Occured"
 *
 *
 */
router.get(
  "/:id",
  authController.protectMiddleware,
  productController.getProductById
);
router.get(
  "/get/nameImagePrice",
  authController.protectMiddleware,
  productController.getProductNameImagePrice
);
router.get(
  "/get/nameDescription",
  authController.protectMiddleware,
  productController.getProductNameDescription
);

router.get(
  "/get/count",
  authController.protectMiddleware,
  productController.getProductAndCount
);
module.exports = router;
