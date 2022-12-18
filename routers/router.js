"use strict";

module.exports = (app) => {
  const gamesController = require("../controllers/gamesController");
  const platformController = require("../controllers/platformController");
  const genreController = require("../controllers/genreController");
  const screenshotController = require("../controllers/screenshotController");
  const getGenreDetailsController = require("../controllers/genreDetailsController");
  const getPlatformDetailsContoller = require("../controllers/platformDetailsController");
  const GameController = require("../controllers/GameController");
  const userController = require("../controllers/userController");

  //Create endpoint to database
  app.route("/games/getGameDetails").get(gamesController.getGameDetails);
  
  app.route("/games/getGamePlatforms").get(platformController.getGamePlatforms);

  app.route("/games/getGameGenres").get(genreController.getGameGenres);

  app.route("/games/getScreenshots").get(screenshotController.getScreenshots);

  app.route("/games/getGenreDetails").get(getGenreDetailsController.getGenreDetails);

  app.route("/games/getPlatformDetails").get(getPlatformDetailsContoller.getPlatformDetails);

  app.route("/games/getAllGameDetails").get(GameController.getAllGameDetails);

  app.route("/games/getTenGameDetails").get(GameController.getTenGameDetails);

  app.route("/games/getCriticallyAcclaimedGames").get(GameController.getCriticallyAcclaimedGames);

  app.route("/games/fetchGameByID").get(GameController.fetchGameByID);

  app.route("/games/fetchGameScreenshotByID").get(GameController.fetchGameScreenshotByID);

  app.route("/games/getGamePlatformDetailsByID").get(GameController.getGamePlatformDetailsbyID);

  app.route("/games/getGamesbyGenre").get(GameController.getGamesByGenre);

  app.route("/games/searchGamesByName").get(GameController.searchGamesByName);

  app.route("/users/registerUser").post(userController.registerUser);
  
  app.route("/users/userLogin").post(userController.userLogin);

  app.route("/users/userLogout").post(userController.userLogout)

  app.route("/users/getUserDetails").get(userController.getUserDetails);

  app.route("/users/updateUser").put(userController.updateUserDetails);

  app.route("/users/deleteUser").delete(userController.deleteUser);

  app.route("/games/updateGamePrices").put(GameController.updateGamePrices);
  // Handling 404 request from the client

  app.use((req, res, next) => {
    res.status(404).send("<h1>Page not found on the server</h1>");
  });
};
