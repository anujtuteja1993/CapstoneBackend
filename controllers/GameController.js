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

exports.fetchGameByID = async (req, res) => {
    try {

        var gameIds = JSON.parse(req.query.game_ids);
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