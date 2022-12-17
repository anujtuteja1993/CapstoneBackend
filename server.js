require("dotenv").config();

const express = require("express");
const cors = require('cors')
const routes = require("./routers/router");
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");



//Enable all cors for all request
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.options('*', cors());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

const corsConfig = {
  credentials: true,
  origin: true,
};

routes(app); //register the route

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log("Error occurred", error);
  }
});


app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

