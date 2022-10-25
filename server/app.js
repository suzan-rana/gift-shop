const express = require("express");
const cors = require("cors");
const { default: mongoose, mongo } = require("mongoose");
const AppError = require("./utils/appError");
const dotenv = require("dotenv").config({ path: "./.env" });
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const produccRoute = require("./routes/productRoute");
const userRoute = require("./routes/UserRoute");
const cartRoute = require("./routes/cartRoute");
const errorController = require("./controllers/ErrorController");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express();
process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API N-ecommerce",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder for N_Ecommerce.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "solo developer",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: "http://localhost:8000",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      Bearer: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes("favicon.ico")) {
    res.status(204).end();
  }
  next();
}
app.use(ignoreFavicon);
/**
 * @swagger
 * /category:
 *  get:
 *   description:Get all the category
 *   responses:
 *    200:
 *     description:success
 *
 */

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));

//for atlas connecdtion
const mongodbUrl = process.env.MONGODB_ATLAS_SERVER.replace(
  "<password>",
  process.env.MONGODB_ATLAS_SERVER_PASSWORD
);

//connecting to local database
mongoose
  .connect(process.env.MONGODB_COMPASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb atlas connected ");
  })
  .catch((error) => {
    console.log(error);
  });
console.log(process.env.NODE_ENV);
app.use(morgan("dev"));
//route specified
app.use("/user", authRoute);
//middleware to pass the token if token matched it succed otherwise show error

app.use("/category", categoryRoute);
app.use("/product", produccRoute);
app.use("/users", userRoute);
app.use("/cart", cartRoute);

//unhandled routes goes to this middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl} route `, 400));
});

//error handled middleware
app.use(errorController);

module.exports = app;
