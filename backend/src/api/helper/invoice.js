const moment = require('moment');
const con = require("../../connection/index").con;

function file_path(res, username,file_path){
  var query1="update user set thumbnail='"+file_path+"' where username='"+username+"'";
  commitQuery(query1)
  responseData = {'code':200, 'response': 'done'};
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).send(JSON.stringify(responseData));
        res.end();

}
function invoice(res, username){
    var query = "SELECT * FROM invoice_data WHERE username = '"+username+"'";
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
function cre_invoice(res, invoice_date ,invoice_no,billed_to ,amount,status , due_date 
  ,username,taxSelect,currency,items,note,terms) {
  var select = "SELECT * FROM invoice_data WHERE username = '" + username +   "' AND invoice_no = '" + invoice_no + "'"; 
      con.query(select, function (err, result) {
        if (result.length > 0) {
          res.header('Access-Control-Allow-Origin', '*');
          responseData = { 'code': 400, 'response': "Duplicate Entry" };
          res.status(400).send(JSON.stringify(responseData));
          res.end();

        } else {
          var currentDate = new Date();
      var formattedDate = currentDate.toISOString().slice(0, 10);
          var query = "INSERT INTO `invoice_data` (username,invoice_date, invoice_no, billed_to, total_amount, status, due_date,tax,currency,items,notes,date,add_terms ) VALUES ('" + username + "','" + invoice_date + "','" + invoice_no + "','" + billed_to + "','" + amount.split('₹')[1] + "','" + status + "','" + due_date + "','" + taxSelect + "','" + currency + "','" + items + "','" + note + "','" +formattedDate+"','" +terms+"')";
          con.query(query, function (err, result) {
            if (err) {
                const responseData = { 'code': 500, 'response': err };
                res.header('Access-Control-Allow-Origin', '*');
                res.status(500).send(JSON.stringify(responseData));
                res.end();
            }
            else {
                responseData = { 'code': 200, 'response': `updated result:${result}`};
                res.header('Access-Control-Allow-Origin', '*');
                res.status(200).send(JSON.stringify(responseData));
                res.end();
            }
    
        });
        }
      });
      
    }
    
    function commitQuery(query){
      if (!con){ 
        console.log("Could not connect to campEngine!");
      }
      else{
        console.log(query);
        con.query(query, function (err, result) {
          if (err){
            console.log(err);
          }
          else{
            console.log("Query Success!");
          }
        });
      }
    }
      
          function get_invoice(res, username , invoice_no){
            var query = "SELECT * FROM invoice_data WHERE username = '"+username+"' AND invoice_no = '"+invoice_no+"' ";
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
        invoice,
        cre_invoice,
        file_path,
        get_invoice
      }