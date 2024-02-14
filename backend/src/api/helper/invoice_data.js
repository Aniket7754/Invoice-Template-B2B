
const moment = require('moment');
const con = require("../../connection/index").con;

function invoice_data(res, username,invoice_no , invoice_date , due_date , currency,items , notes , add_terms) {
    var select = "SELECT invoice_no FROM invoice_data WHERE username = '" + username + "' AND invoice_no = '" + invoice_no + "'";
    con.query(select, function (err, result) {
        console.log(result)
        if (result.length > 0) {
            return res.send({ "message": "Duplicate Entry" })
        }
        else {
            var query = "INSERT INTO `client` (username,position,Business_name,industry,country,city,state,street_address,business_alias,unique_key,number,email,vat,zip,gst,pan,account_h_name,account_no,ifsc_code,swift,bank) VALUES ('" + username + "','" + position + "','" + Business_name + "','" + industry + "','" + country + "','" + city + "','" + state + "','" + street_address + "','" + business_alias + "','" + unique_key + "','" + number + "','" + email + "','" + vat + "','" + zip + "','" + gst + "','" + pan + "','" + account_h_name + "','" + account_no + "','" + ifsc_code + "','" + swift + "','" + bank + "')";
            commitQuery(query);
            responseData = { 'code': 200, 'response': 'Client added !!!' };
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).send(JSON.stringify(responseData));
            res.end();
        }
    })
}

function invoice_no(res, username){
    var query = "SELECT invoice_no FROM invoice_data WHERE username = '"+username+"'";
    con.query(query, function (err, result) {
      if (err) {
        console.log(err);
        const responseData = { 'code': 500, 'response': err };
        res.header('Access-Control-Allow-Origin', '*');
        res.status(500).send(JSON.stringify(responseData));
        res.end();
      }
      else {
        console.log(result)
        responseData = { 'code': 200, 'response': result };
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).send(JSON.stringify(responseData));
        res.end();
      }
    });
}
function commitQuery(query) {
    if (!con) {
        console.log("Could not connect to database!");
    }
    else {
        console.log(query);
        con.query(query, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Query Success!");
            }
        });
    }
}






function user_data(res, username){
    var query = "SELECT * FROM user WHERE username = '"+username+"'";
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
module.exports = {
    invoice_data,
    invoice_no,
    user_data

}