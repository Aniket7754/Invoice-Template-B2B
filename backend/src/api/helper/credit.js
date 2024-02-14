const moment = require('moment');
const con = require("../../connection/index").con;
var getDaysArray = function (s, e) { for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) { a.push(moment(new Date(d)).format('YYYY-MM-DD').toString()); } return a; };


function credit(res, username) {
  var query = "SELECT * FROM credit WHERE username = '" + username + "'";
  con.query(query, function (err, result) {
    if (err) {
      console.log(err);
      const responseData = { 'code': 500, 'response': err };
      res.header('Access-Control-Allow-Origin', '*');
      res.status(500).send(JSON.stringify(responseData));
      res.end();
    }
    else {
      responseData = { 'code': 200, 'response': result };
      res.header('Access-Control-Allow-Origin', '*');
      res.status(200).send(JSON.stringify(responseData));
      res.end();
    }
  });
}
function create_credit(res, username, credit_date, credit_note, invoice_no, credit_no, credit_issued, amount, status, billed_to, tax, items, add_terms) {
  var select = "SELECT credit_no FROM credit WHERE username = '" + username + "' AND credit_note = '" + credit_note + "'"; "'";
  con.query(select, function (err, result) {
    console.log(result);
    if (err) {
      return res.send({ "message": "Database error" });
    }

    if (result.length > 0) {
      return res.send({ "message": "Duplicate Entry" });
    } else {
      var currentDate = new Date();
      var formattedDate = currentDate.toISOString().slice(0, 10);
      var query = "INSERT INTO `credit` (username,date, credit_date, notes, invoice_no, credit_no, credit_issued, amount, status,billed_to ,tax ,items , add_terms) VALUES ('" + username + "','" + formattedDate + "','" + credit_date + "','" + credit_note + "','" + invoice_no + "','" + credit_no + "','" + credit_issued + "','" + amount + "','" + status + "','" + billed_to + "','" + tax + "','" + items + "','" + add_terms + "')";
      con.query(query, function (err, result) {
        if (err) {
          return res.send({ "message": "Database error" });
        }
        return res.send({ "message": "Credit entry created successfully" });
      });
    }
  });
}


function commitQuery(query, res) {
  if (!con) {
    console.log("Could not connect to database!");
    return res.send({ "message": "Could not connect to the database" });
  } else {
    console.log(query);
    con.query(query, function (err, result) {
      if (err) {
        console.log('aniketkes', err);
        return res.send({ "message": "Error executing query" });
      } else {
        console.log("Query Success!");
        responseData = { 'code': 200, 'response': 'Invoice detail added!' };
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).send(JSON.stringify(responseData));
      }
    });
  }
}
// UTILITY FUNCTIONS


module.exports = {
  credit,
  create_credit
}