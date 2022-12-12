const axios = require("axios");
const mysql = require("mysql2");
const config = require("../connection/config.js");

const successMessage = "Successfully retrieved genre details";

exports.getGenreDetails = async (req, res) => {
    try {
        const gamesAPI =
            process.env.GAMES_API_ENDPOINT +
            "genres" +
            "?key=" +
            process.env.GAMES_API_KEY;

        console.log(gamesAPI);
        const response = await fetch(gamesAPI);
        const data = await response.json();
        res.status(200);
        const results = data.results;
        const connection = mysql.createConnection(config);
        results.forEach((element) => {
            const id = element.id;
            const genre_name = element.name;
            const genre_image = element.image_background;

            let sqlData = [id, genre_name, genre_image];
            let sql = `INSERT INTO genre (id, genre_name, genre_image) VALUES (?, ?, ?)`;
            connection.query(sql, sqlData, (err, results, fields) => {
                if (err) {
                    throw Error(err.message);
                }
            });

        });

        res.json({ success: true, message: successMessage, data: results });
        res.end();
    } catch (e) {
        res.json({ success: false, message: e.message });
        res.end();
    }
};
