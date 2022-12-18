const axios = require("axios");
const mysql = require("mysql2");
const config = require("../connection/config.js");

const successMessage = "Successfully retrieved game details";

exports.getGameDetails = async (req, res) => {
    try {
        for (i = 1; i < 11; i++) {
            const gamesAPI =
                process.env.GAMES_API_ENDPOINT +
                "games" +
                "?key=" +
                process.env.GAMES_API_KEY +
                "&page_size=40" +
                "&page=" +
                i;
            const response = await fetch(gamesAPI);
            const data = await response.json();
            res.status(200);
            const results = data.results;

            // const gameID = results[0].id;
            // const gameName = results[0].name;
            // const gameRating = results[0].rating;
            // const gameImage = results[0].background_image;
            // const gameReleased = results[0].released;
            // const genreID = results[0].genres[0].id;
            // const metacritic = results[0].metacritic;
            // const platformID = results[0].platforms[0].platform.id;
            // const gameesrb = results[0].esrb_rating.id;

            const connection = mysql.createConnection(config);

            results.forEach((element) => {
                const id = element.id;
                const game_name = element.name;
                const game_image = element.background_image;
                const metacritic = element.metacritic;
                const rating = element.rating;
                const release_date = element.released;

                // const genreID = element.genres[0].id;
                // const platformID = element.platforms[0].platform.id;
                // console.log(results[j].id);

                // const gameID = results[j].id;
                // const gameName = results[j].name;
                // const gameRating = results[j].rating;
                // const gameImage = results[j].background_image;
                // const gameReleased = results[j].released;
                // const genreID = results[j].genres[0].id;
                // const metacritic = results[j].metacritic;
                // const platformID = results[j].platforms[0].platform.id;
                // const gameesrb = results[i].esrb_rating[0].id;
                // let sqlData = [
                //   gameID,
                //   gameName,
                //   gameRating,
                //   gameImage,
                //   gameReleased,
                //   genreID,
                //   metacritic,
                //   platformID,
                // ];
                let sqlData = [id, game_name, game_image, metacritic, rating, release_date];
                let sql = `INSERT INTO game (id, game_name, game_image, metacritic, rating, release_date) VALUES (?,?,?,?,?,?)`;

                // CREATE TABLE `capstone_database`.`game` (
                //     `id` INT NOT NULL AUTO_INCREMENT,
                //     `game_name` VARCHAR(255) NOT NULL,
                //     `game_image` VARCHAR(9000) NULL,
                //     `metacritic` INT NULL,
                //     `rating` FLOAT NULL,
                //     `release_date` DATETIME NULL,
                //     PRIMARY KEY (`id`));


                connection.query(sql, sqlData, (error, results, fields) => {
                    if (error) {
                        throw Error(error.message);
                    }
                });
            });
        }

        // fetch(gamesAPI)
        // .then(resp=>resp.json())
        // .then(results => console.log(results.results))
        // res.set("Content-type", "application/json");
        res.json({ success: true, message: successMessage });
        res.end();
    } catch (e) {
        res.json({ success: false, message: e.message });
        res.end();
    }
};
