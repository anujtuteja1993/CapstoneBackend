const axios = require("axios");
const mysql = require("mysql2");
const config = require("../connection/config.js");

const successMessage = "Successfully retrieved genre details";

exports.getGameGenres = async (req, res) => {
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

            const connection = mysql.createConnection(config);
            results.forEach((element) => {
                const game_id = element.id;
                const genres = element.genres;
                genres.forEach((item) => {
                    const genre_id = item.id;
                    let sqlData = [game_id, genre_id];
                    let sql = `INSERT INTO game_genre (game_id, genre_id) VALUES (?, ?)`;
                    connection.query(sql, sqlData, (err, results, fields) => {
                        if (err) {
                            throw Error(err.message);
                        }
                    });
                });
            });
        }
        res.json({ success: true, message: successMessage });
        res.end();
    } catch (e) {
        res.json({ success: false, message: e.message });
        res.end();
    }
};
