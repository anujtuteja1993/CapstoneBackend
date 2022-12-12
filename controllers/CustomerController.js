"use strict";
const mysql = require("mysql2");
const config = require("../connection/config.js");

exports.getCustomerPurchaseByCustomerId = async (req, res) => {
  try {
    if (!req.query.customerId) {
      throw Error("Missing Customer Id");
    }

    const customerId = req.query.customerId;
    console.log(customerId);
    const connection = mysql.createConnection(config);
    let sql = `Select Customer.customer_id, Customer.first_name, Customer.last_name, Customer.email,
    Sum(Payment.Amount) as 'total_payment'
    From Customer, Payment
    Where Payment.customer_id = Customer.customer_id
    And Customer.customer_id = ${customerId}`;

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

exports.getAllPurchaseByCustomer = async (req, res) => {
    try {
      const connection = mysql.createConnection(config);
      let sql = `Select Customer.customer_id, Customer.first_name, Customer.last_name, Customer.email,
      Sum(Payment.Amount) as 'total_payment'
      From Customer, Payment
      Where Payment.customer_id = Customer.customer_id
      GROUP BY Customer.customer_id`;
  
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