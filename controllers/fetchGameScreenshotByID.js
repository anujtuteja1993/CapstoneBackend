"use strict";
const mysql = require("mysql2");
const config = require("../connection/config.js");

exports.fetchGameScreenshotByID = async (req, res) => {
    try {
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