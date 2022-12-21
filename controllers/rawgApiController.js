const axios = require("axios");
const mysql = require("mysql2");
const config = require("../connection/config.js");


exports.getGameDetails = async (req, res) => {
    
    const successMessage = "Successfully retrieved game details";
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
                const id = element.id;
                const game_name = element.name;
                const game_image = element.background_image;
                const metacritic = element.metacritic;
                const rating = element.rating;
                const release_date = element.released;

                let sqlData = [id, game_name, game_image, metacritic, rating, release_date];
                let sql = `INSERT INTO game (id, game_name, game_image, metacritic, rating, release_date) VALUES (?,?,?,?,?,?)`;

                connection.query(sql, sqlData, (error, results, fields) => {
                    if (error) {
                        throw Error(error.message);
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



exports.getGameGenres = async (req, res) => {
    
    const successMessage = "Successfully retrieved genre details";
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

exports.getGenreDetails = async (req, res) => {

    const successMessage = "Successfully retrieved genre details";
    try {
        const gamesAPI =
            process.env.GAMES_API_ENDPOINT +
            "genres" +
            "?key=" +
            process.env.GAMES_API_KEY;

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

exports.getGamePlatforms = async (req, res) => {

    const successMessage = "Successfully retrieved platform details";
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
                const platforms = element.platforms;
                platforms.forEach((item) => {
                    const platform_id = item.platform.id;
                    let sqlData = [game_id, platform_id];
                    let sql = `INSERT INTO game_platform (game_id, platform_id) VALUES (?, ?)`;
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


exports.getPlatformDetails = async (req, res) => {

    const successMessage = "Successfully retrieved platform details";
    try {
        for(i =1; i < 3; i++) {

        const gamesAPI =
            process.env.GAMES_API_ENDPOINT +
            "platforms" +
            "?key=" +
            process.env.GAMES_API_KEY +
            "&page=" + i;

        const response = await fetch(gamesAPI);
        const data = await response.json();
        res.status(200);
        const results = data.results;
        const connection = mysql.createConnection(config);
        results.forEach((element) => {
            const id = element.id;
            const platform_name = element.name;
            const platform_image = element.image_background;

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

exports.getScreenshots = async (req, res) => {
    try {

        const successMessage = "Successfully retrieved screenshots for games";
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