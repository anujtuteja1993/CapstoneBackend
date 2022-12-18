"use strict";
const mysql = require("mysql2");
const config = require("../connection/config.js");


exports.getAllGameDetails = async (req, res) => {
    try {

        const connection = mysql.createConnection(config);
        let sql = "SELECT * FROM game";

        connection.query(sql, (error, results, fields) => {
            if (error) {
                throw Error(error.message);
            }
            res.status(200);
            res.json({ success: true, data: results });
        });

        connection.end();
    } catch (e) {
        res.status(400);
        res.json({ success: false, message: e.message });
        throw Error(e.message);
    }
};


exports.getTenGameDetails = async (req, res) => {
    try {

        const connection = mysql.createConnection(config);
        let sql = "SELECT * FROM game LIMIT 10";

        connection.query(sql, (error, results, fields) => {
            if (error) {
                throw Error(error.message);
            }
            res.status(200);
            res.json({ success: true, data: results });
        });

        connection.end();
    } catch (e) {
        res.status(400);
        res.json({ success: false, message: e.message });
        throw Error(e.message);
    }
};

exports.getCriticallyAcclaimedGames = async (req, res) => {
    try {

        const connection = mysql.createConnection(config);
        let sql = `SELECT * FROM GAME
        WHERE Metacritic > 90
        ORDER BY release_date DESC
        LIMIT 20;`;

        connection.query(sql, (error, results, fields) => {
            if (error) {
                throw Error(error.message);
            }
            res.status(200);
            res.json({ success: true, data: results });
        });

        connection.end();
    } catch (e) {
        res.status(400);
        res.json({ success: false, message: e.message });
        throw Error(e.message);
    }
};

exports.fetchGameByID = async (req, res) => {
    try {

        let gameIds = JSON.parse(req.query.game_ids);
        if (gameIds.length === 0) {
            res.status(200);
            res.json({ success: true, data: [] });
        }
        else {
            const connection = mysql.createConnection(config);
            let sql = `SELECT * FROM game where id IN (${gameIds})`;

            connection.query(sql, (error, results, fields) => {
                if (error) {
                    throw Error(error.message);
                }
                res.status(200);
                res.json({ success: true, data: results });
            });

            connection.end();
        }
    } catch (e) {
        res.status(400);
        res.json({ success: false, message: e.message });
        throw Error(e.message);
    }
};

exports.fetchGameScreenshotByID = async (req, res) => {
    try {

        if (!req.query.game_id) {
            throw Error("Missing Game Id");
        }
        const game_id = req.query.game_id;
        const connection = mysql.createConnection(config);
        let sql = `SELECT image FROM screenshot where game_id = ${game_id}`;

        connection.query(sql, (error, results, fields) => {
            if (error) {
                throw Error(error.message);
            }
            res.status(200);
            res.json({ success: true, data: results });
        });
        connection.end();
    } catch (e) {
        res.status(400);
        res.json({ success: false, message: e.message });
        throw Error(e.message);
    }
};

exports.getGamePlatformDetailsbyID = async (req, res) => {
    try {

        if (!req.query.game_id) {
            throw Error("Missing Game Id");
        }
        const game_id = req.query.game_id;
        const connection = mysql.createConnection(config);

        let sql = `SELECT platform.platform_name
        FROM platform, game, game_platform
        WHERE game.id = ${game_id}
        AND game_platform.platform_id = platform.id
        AND game.id = game_platform.game_id; `;


        connection.query(sql, (error, results, fields) => {
            if (error) {
                throw Error(error.message);
            }
            res.status(200);
            res.json({ success: true, data: results });
        });

        connection.end();
    } catch (e) {
        res.status(400);
        res.json({ success: false, message: e.message });
        throw Error(e.message);
    }
};

exports.getGamesByGenre = async (req, res) => {
    try {

        let genres = JSON.parse(req.query.genres);


        genres.forEach((genre, index) => {
            genres[index] = "'" + genre + "'";
        });

        if (genres.length === 0) {
            res.status(200);
            res.json({ success: true, data: [] });
        }
        else {
            const connection = mysql.createConnection(config);
            let sql = `SELECT game.id, game.game_name, game.game_image, genre_name
            FROM genre, game, game_genre
            WHERE game_genre.genre_id = genre.id
            AND game.id = game_genre.game_id
            AND genre.genre_name IN (${genres})
            ORDER BY game.game_name;`;

            connection.query(sql, (error, results, fields) => {
                if (error) {
                    throw Error(error.message);
                }
                res.status(200);
                res.json({ success: true, data: results });
            });

            connection.end();
        }
    } catch (e) {
        res.status(400);
        res.json({ success: false, message: e.message });
        throw Error(e.message);
    }
};

exports.searchGamesByName = async (req, res) => {
    try {

        let game_name = req.query.game_name;

        console.log(game_name);
        if (game_name === "") {
            res.status(200);
            res.json({ success: true, data: [] });
        }

        else {
            const connection = mysql.createConnection(config);
            let sql = `SELECT * FROM game WHERE game_name LIKE '%${game_name}%';`;

            connection.query(sql, (error, results, fields) => {
                if (error) {
                    throw Error(error.message);
                }
                res.status(200);
                res.json({ success: true, data: results });
            });

            connection.end();
        }
    } catch (e) {
        res.status(400);
        res.json({ success: false, message: e.message });
        throw Error(e.message);
    }
};

exports.updateGamePrices = async (req, res) => {

    try {
        const connection = mysql.createConnection(config);
        let sql = `UPDATE game SET Price = CASE 
        WHEN (YEAR(release_date) < 1990) THEN 3.99
        WHEN (YEAR(release_date) < 2000) THEN 7.99
        WHEN (YEAR(release_date) < 2010) THEN 20.99
        WHEN (YEAR(release_date) < 2020) THEN 39.99
        ELSE 59.99 END;`;

        connection.query(sql, (error, results, fields) => {
            if (error) {
                throw Error(error.message);
            }
            res.status(200);
            res.json({ success: true, messages: "Game Prices have been updated", data: results });
        });

        connection.end();
    } catch (e) {
        res.status(400);
        res.json({ success: false, message: e.message });
        throw Error(e.message);
    }
};