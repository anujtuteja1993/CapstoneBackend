"use strict";

module.exports = (app) => {
  const customerController = require("../controllers/CustomerController");
  const gamesController = require("../controllers/gamesController");
  const platformController = require("../controllers/platformController");
  const genreController = require("../controllers/genreController");
  const screenshotController = require("../controllers/screenshotController");
  const getGenreDetailsController = require("../controllers/genreDetailsController");
  const getPlatformDetailsContoller = require("../controllers/platformDetailsController");
  const getAllGameDetailsController = require("../controllers/fetchAllGames");
  const getTenGameDetailsController = require("../controllers/fetchTengamesController");
  const fetchGameByIDController = require("../controllers/fetchGameByID");
  const fetchGameScreenshotByIDController = require("../controllers/fetchGameScreenshotByID");
  const GameController = require("../controllers/GameController");
  //Create endpoint to database
  app
    .route("/customers/getCustomerPurchaseByCustomerId")
    .get(customerController.getCustomerPurchaseByCustomerId);
  app
    .route("/customers/getAllPurchaseByCustomer")
    .get(customerController.getAllPurchaseByCustomer);

  app.route("/games/getGameDetails").get(gamesController.getGameDetails);
  
  app.route("/games/getGamePlatforms").get(platformController.getGamePlatforms);

  app.route("/games/getGameGenres").get(genreController.getGameGenres);

  app.route("/games/getScreenshots").get(screenshotController.getScreenshots);

  app.route("/games/getGenreDetails").get(getGenreDetailsController.getGenreDetails);

  app.route("/games/getPlatformDetails").get(getPlatformDetailsContoller.getPlatformDetails);

  app.route("/games/getAllGameDetails").get(getAllGameDetailsController.getAllGameDetails);

  app.route("/games/getTenGameDetails").get(getTenGameDetailsController.getTenGameDetails);

  app.route("/games/fetchGameByID").get(GameController.fetchGameByID);

  app.route("/games/fetchGameScreenshotByID").get(GameController.fetchGameScreenshotByID);
  // Handling 404 request from the client
  app.use((req, res, next) => {
    res.status(404).send("<h1>Page not found on the server</h1>");
  });
};
