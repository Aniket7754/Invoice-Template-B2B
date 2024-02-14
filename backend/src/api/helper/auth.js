/* eslint-env node */
const jwt = require("jsonwebtoken");
const secretKey = "kavacoin123456";

const con = require("../../connection/index").con;
const fs = require('fs')
const { query } = require('express');
const moment = require('moment');
const { off } = require('process');
const { exec } = require('child_process');


function login(res, username, password) {
  if (!username || !password) {
    const responseData = { 'code': 500, 'response': 'All inputs are required' };
    res.header('Access-Control-Allow-Origin', '*');
    res.status(500).send(JSON.stringify(responseData));
    res.end();
  } else {
    const q = "select * from user WHERE `username` = '" + username + "'";
    // const s = `select 'password' from user WHERE username=${username}`;

    con.query(q, (err, result) => {
      if (result?.[0]?.password === password) {
        // responseData['token'] = generateAccessToken(customer_id_password.customer_id);
        // var ip='';
        responseData = { code: 200, response: 'Login Succesful',result:result };

        console.log(responseData)
        res.header('Access-Control-Allow-Origin', '*');
        res.status(500).send(JSON.stringify(responseData));
        res.end();
      }
      else {
        const responseData = { code: 500, response: 'Login Unsuccesful'};
        res.header('Access-Control-Allow-Origin', '*');
        res.status(500).send(JSON.stringify(responseData));
        res.end();
      }
    })
  }
}

function for_password(res, email, new_password) {
  if (!email) {
    const responseData = { 'code': 500, 'response': 'All inputs are required' };
    res.header('Access-Control-Allow-Origin', '*');
    res.status(500).send(JSON.stringify(responseData));
    res.end();
  } else {
    const q = "SELECT * FROM user WHERE `email` = '" + email + "'";

    con.query(q, (err, result) => {
      if (result.length == 0) {
        const responseData = { code: 200, response: 'user not found' };
        console.log(responseData);
        res.header('Access-Control-Allow-Origin', '*');
        res.status(500).send(JSON.stringify(responseData));
        res.end();
      } else {
        const que = `UPDATE user SET password = '${new_password}' WHERE email = '${email}'`;
        con.query(que, (err, result) => {
          if (err) {
            const responseData = { code: 500, response: err };
            console.log(responseData);
            res.header('Access-Control-Allow-Origin', '*');
            res.status(500).send(JSON.stringify(responseData));
            res.end();
          } else {
            console.log(result);
            const responseData = { code: 200, response: 'password changed' };
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).send(JSON.stringify(responseData));
            res.end();
          }
        });
      }
    });
  }
}




module.exports = {
  login,
  for_password
}