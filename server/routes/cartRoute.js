const express = require("express");
const router = express();
const authController = require("../controllers/authController");
const cartController = require("../controllers/cartController");

/**
 * @swagger
 * components:
 *  schemas:
 *   cart:
 *    type: object
 *    properties:
 *     user:
 *      type: string
 *      example: "1242_234Uhiu3_235"
 *      required: true
 *      description: "Specific user to get the cart product "
 *     product:
 *      type: string
 *      example: "ps4"
 *     quantity:
 *      type: number
 *
 */

/**
 * @swagger
 * /cart:
 *  get:
 *   security:
 *    - Bearer: []
 *   tags:
 *    - Cart
 *   summary: "For Getting list of cart items "
 *   description: Get all cart items listed for specific user
 *   responses:
 *    200:
 *     description: "List Cart items "
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/cart"
 *    400:
 *     description: "Error fetching cart item "
 *
 *
 */

router.get("/", authController.protectMiddleware, cartController.getAllCart);

/**
 * @swagger
 * /cart:
 *  post:
 *   security:
 *     - Bearer: []
 *   tags:
 *    - Cart
 *   summary: "Forposting product in the cart  "
 *   description: Post the new product in the cart
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        product:
 *         type: string
 *         required: true
 *        quantity:
 *         type: number
 *         required: true
 *       example:
 *        product: 23423_2342jni2_324
 *        quantity: 4
 *   responses:
 *    200:
 *     description: "Post the product to the cart  "
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/category"
 *     400:
 *    description: "Error posting to the cart  "
 *
 *
 */
router.post("/", authController.protectMiddleware, cartController.postCart);

/**
 * @swagger
 * /cart/{id}:
 *  put:
 *   security:
 *    - Bearer: []
 *   tags:
 *    - Cart
 *   summary: "To update the cart list   "
 *   description: user can update the cart quantity need to provide the cart item id
 *   parameters:
 *   - name: id
 *     in: path
 *     description: Enter the specific cart id in parameter to update the quantity
 *     required: true
 *     schema:
 *      type: string
 *      example: 2345ei_2432jkd_34
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *        schema:
 *         type: object
 *         properties:
 *           quantity:
 *            type: number
 *            required: true
 *
 *         example:
 *          quantity: 3
 *   responses:
 *    202:
 *     description: "cart updated "
 *     content:
 *      multipart/form-data:
 *       schema:
 *        $ref: "#/components/schemas/cart"
 *     400:
 *      description: "Error updating cart  "
 *
 *
 */
router.put("/:id", authController.protectMiddleware, cartController.updateCart);

/**
 * @swagger
 * /cart/{id}:
 *  delete:
 *   security:
 *    - Bearer: []
 *   tags:
 *    - Cart
 *   summary: "For Deleting the Selected cart  "
 *   description: Deleting Selected cart
 *   parameters:
 *    - name: id
 *      in: path
 *      description: Entet the cart id in parameter to delete the selected cart
 *      required: true
 *      schema:
 *       type: string
 *       example : "2343_2345r34wef23_34"
 *   responses:
 *    200:
 *     description: "cart of selected id Deleted  "
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/cart"
 *    400:
 *     description: "Error occured"
 *
 *
 */
router.delete(
  "/:id",
  authController.protectMiddleware,
  cartController.deleteCart
);

/**
 * @swagger
 * /cart/{id}:
 *  get:
 *   security:
 *    - Bearer: []
 *   tags:
 *    - Cart
 *   summary: "For Getting selected  cart "
 *   description: Get  the specific cart
 *   parameters:
 *    - name: id
 *      in: path
 *      description: Entet the cart id in parameter to get only cart of selected id
 *      required: true
 *      schema:
 *       type: string
 *       example : "2343_2345r34wef23_34"
 *   responses:
 *    200:
 *     description: "List of selected cart  "
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/cart"
 *    400:
 *     description: "Error Occured"
 *
 *
 */
router.get(
  "/:id",
  authController.protectMiddleware,
  cartController.getCartWithId
);
module.exports = router;
