"use strict";

module.exports = (app) => {

  const rawgApiController = require("../controllers/rawgApiController");
  const GameController = require("../controllers/GameController");
  const userController = require("../controllers/userController");

  //Create endpoint to database
  app.route("/api/getGameDetailsFromApi").get(rawgApiController.getGameDetails);

  app.route("/api/getGenreDetailsFromApi").get(rawgApiController.getGenreDetails);

  app.route("/api/getPlatformDetailsFromApi").get(rawgApiController.getPlatformDetails);
  
  app.route("/api/getGamePlatformsFromApi").get(rawgApiController.getGamePlatforms);

  app.route("/api/getGameGenresFromApi").get(rawgApiController.getGameGenres);

  app.route("/api/getScreenshotsFromApi").get(rawgApiController.getScreenshots);

  app.route("/games/getAllGameDetails").get(GameController.getAllGameDetails);

  app.route("/games/getTenGameDetails").get(GameController.getTenGameDetails);

  app.route("/games/getCriticallyAcclaimedGames").get(GameController.getCriticallyAcclaimedGames);

  app.route("/games/getHighestUserRatedGames").get(GameController.getHighestUserRatedGames);

  app.route("/games/getClassicGames").get(GameController.getClassicGames);

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
