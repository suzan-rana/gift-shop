const app = require("./app");
const dotenv = require("dotenv").config({ path: "./.env" });

//port from env file
const port = process.env.PORT || 8000;
//listening to server
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
