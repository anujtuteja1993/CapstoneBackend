require("dotenv").config();

const express = require("express");
const cors = require('cors')
const swaggerUI = require('swagger-ui-express');
const routes = require("./routers/router");
const app = express();
const port = process.env.PORT || 3000;

swaggerDocument = require('./swagger.json');

//Enable all cors for all request
app.use(cors())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

routes(app); //register the route

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log("Error occurred", error);
  }
});
