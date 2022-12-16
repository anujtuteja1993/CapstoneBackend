"use strict";
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const config = require("../connection/config.js");

exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.query;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const connection = mysql.createConnection(config);
        let sql = `INSERT INTO user (first_name, last_name, email, password) VALUES ('${firstName}', '${lastName}', '${email}', '${hashedPassword}')`;
        connection.query(sql, (error, results, fields) => {
            if (error) {
                throw Error(error.message);
            }
            res.json({ success: true, message: "User successfully registered" });
        });

        connection.end();
    }
    catch (e) {
        res.status(400);
        res.json({ success: false, message: e.message });
        throw Error(e.message);
    }
};