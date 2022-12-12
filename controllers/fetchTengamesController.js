"use strict";
const mysql = require("mysql2");
const config = require("../connection/config.js");

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