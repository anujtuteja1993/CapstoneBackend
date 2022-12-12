const axios = require("axios");
const mysql = require("mysql2");
const config = require("../connection/config.js");

const successMessage = "Successfully retrieved platform details";

exports.getPlatformDetails = async (req, res) => {
    try {
        for(i =1; i < 3; i++) {

        const gamesAPI =
            process.env.GAMES_API_ENDPOINT +
            "platforms" +
            "?key=" +
            process.env.GAMES_API_KEY +
            "&page=" + i;

        console.log(gamesAPI);
        const response = await fetch(gamesAPI);
        const data = await response.json();
        res.status(200);
        const results = data.results;
        const connection = mysql.createConnection(config);
        results.forEach((element) => {
            const id = element.id;
            const platform_name = element.name;
            const platform_image = element.image_background;

            // console.log(id);
            // console.log(platform_name);
            // console.log(platform_image);

            let sqlData = [id, platform_name, platform_image];
            let sql = `INSERT INTO platform (id, platform_name, platform_image) VALUES (?, ?, ?)`;
            connection.query(sql, sqlData, (err, results, fields) => {
                if (err) {
                    throw Error(err.message);
                }
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
