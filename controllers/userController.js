"use strict";
const mysql = require("mysql2");
const config = require("../connection/config.js");

exports.registerUser = async (req, res) => {
    try {

        const {firstName, lastName, email, password} = req.body;
        const salt = await bcrypt.genSalt();

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