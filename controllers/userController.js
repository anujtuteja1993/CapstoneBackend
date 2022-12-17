"use strict";
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const config = require("../connection/config.js");
const connectionConfig = require("../connection/connectionConfig.js");
const { request } = require("express");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
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

exports.userLogin = async (req, res) => {
    try {
        console.log("login attempt")
        const { email, password } = req.body;
        const connection = mysql.createConnection(config);
        let sql = `SELECT * FROM user WHERE email = "${email}";`;

        let emailQueryResult = await new Promise((resolve, reject) => {
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    reject(new Error("Unable to get query by email"));
                }
                resolve({
                    message: "Getting email successful",
                    success: true,
                    data: results,
                });
            });
        });
        connection.end();
        const match = await bcrypt.compare(
            password,
            emailQueryResult.data[0].password
        );

        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        const id = emailQueryResult.data[0].id;
        const firstName = emailQueryResult.data[0].first_name;
        const lastName = emailQueryResult.data[0].last_name;
        const loginuseremail = emailQueryResult.data[0].email;
        const accessToken = jwt.sign(
            { id, firstName, lastName, loginuseremail },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1d",
            }
        );
        const refreshToken = jwt.sign(
            { id, firstName, lastName, loginuseremail },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "1d",
            }
        );
        let emailQueryUpdate = await new Promise((resolve, reject) => {
            const connection = mysql.createConnection(config);
            let sql = `UPDATE user SET refresh_token = "${refreshToken}" WHERE id = "${id}";`;
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    reject(new Error("Refresh token failed"));
                }
                resolve({
                    message: "Refresh token successful",
                    success: true,
                    data: results,
                });
            });
            connection.end();
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200);
        res.json({ success: true, msg: "Log in successful", token: accessToken });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Email or Password not correct" });
    }
};

exports.userLogout = async (req, res) => {
    const { id } = req.body;

    const connection = mysql.createConnection(config);
    let sql = `SELECT * FROM user WHERE id = "${id}";`;

    let userQuery = await new Promise((resolve, reject) => {
        connection.query(sql, (error, results, fields) => {
            if (error) {
                reject(new Error("Unable to get query by token or id"));
            }

            resolve({
                message: "successful",
                success: true,
                data: results,
            });
        });
    });

    connection.end();

    if (!id) return res.sendStatus(204);

    let clearRefreshtoken = await new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        let sql = `UPDATE user SET refresh_token = NULL WHERE id = ${id};`;
        connection.query(sql, (error, results, fields) => {
            if (error) {
                reject(new Error("Logout Error"));
            }
            resolve({
                message: "Logout Successful",
                success: true,
                data: results,
            });
        });
        connection.end();
    });

    res.status(200);
    res.json({ success: true, msg: "Logout successful" });
};

exports.getUserDetails = async (req, res) => {
    try {
        const { email } = req.query;
        const connection = mysql.createConnection(config);

        let sql = `SELECT id, first_name, last_name, refresh_token FROM user WHERE email = ${email};`;
        connection.query(sql, (error, results, fields) => {
            if (error) {
                throw Error(error.message);
            }
            res.json({ success: true, message: "User Details found", data: results});
        });

        connection.end();
    }
    catch (e) {
        res.status(400);
        res.json({ success: false, message: e.message });
        throw Error(e.message);
    }
};
