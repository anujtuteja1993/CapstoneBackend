const axios = require("axios");
const mysql = require("mysql2");
const config = require("../connection/config.js");

const successMessage = "Successfully retrieved screenshots for games";

exports.getScreenshots = async (req, res) => {
    try {
        for (i = 1; i < 11; i++) {
            const gamesAPI =
                process.env.GAMES_API_ENDPOINT +
                "games" +
                "?key=" +
                process.env.GAMES_API_KEY +
                "&page_size=40" +
                "&page=" 
                +
                i;
            const response = await fetch(gamesAPI);
            const data = await response.json();
            res.status(200);
            const results = data.results;

            const connection = mysql.createConnection(config);
            results.forEach((element) => {
                const game_id = element.id;
                const screenshots = element.short_screenshots;

                screenshots.forEach((item) => {
                    const image = item.image;
                    let sqlData = [image, game_id];
                    let sql = `INSERT INTO screenshot (image, game_id) VALUES (?, ?)`;
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
