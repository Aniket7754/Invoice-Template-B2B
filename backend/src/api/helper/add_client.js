const moment = require('moment');
const con = require("../../connection/index").con;
var getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1)){ a.push(moment(new Date(d)).format('YYYY-MM-DD').toString());}return a;};

function client(res,username){
  var query="select * from client where `username`='"+username+"'";
  console.log(query)
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
      // console.log(result)
    }
  });
}

function client_show(res,Business_name){
  var query="select * from client where `Business_name`='"+Business_name+"'";
  console.log(query)
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
      // console.log(result)
    }
  });
}

function add_client(res, username,position,Business_name,industry,country,city,state,street_address,business_alias,unique_key,number,email,vat,zip,gst,pan,account_h_name,account_no,ifsc_code,swift,bank){
  var select = "SELECT Business_name FROM client WHERE username = '" + username + "' AND Business_name = '" + Business_name + "'";
    con.query(select, function (err, result) {
      console.log(result)
      if (result.length > 0){
        return res.send({"message":"Duplicate Entry"})
      }
      else{
        var query = "INSERT INTO `client` (username,position,Business_name,industry,country,city,state,street_address,business_alias,unique_key,number,email,vat,zip,gst,pan,account_h_name,account_no,ifsc_code,swift,bank) VALUES ('"+username+"','"+position+"','"+Business_name+"','"+industry+"','"+country+"','"+city+"','"+state+"','"+street_address+"','"+business_alias+"','"+unique_key+"','"+number+"','"+email+"','"+vat+"','"+zip+"','"+gst+"','"+pan+"','"+account_h_name+"','"+account_no+"','"+ifsc_code+"','"+swift+"','"+bank+"')";
        commitQuery(query);
        responseData = {'code':200, 'response': 'Client added !!!'};
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).send(JSON.stringify(responseData));
        res.end();
      }
    })
    }
  
    
    function commitQuery(query){
        if (!con){ 
          console.log("Could not connect to database!");
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
        
      
      // UTILITY FUNCTIONS
      
      function details(res,username){
        var query="select * from user where `username`='"+username+"'";
  console.log(query)
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
      console.log(result)
    }
  });

  

      }

      
      function userdata(res){
        var query="select * from user "
  console.log(query)
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
      console.log(result)
    }
  });

  

      }
      module.exports = {
        add_client,
        client,
        details,
        client_show,
        userdata
      }