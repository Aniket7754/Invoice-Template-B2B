/* eslint-env node */
const moment = require('moment');
const con = require("../../connection/index").con;


function register(res,bussiness_name,username,password,address,number,email,bussiness_category)   {
  var select = "SELECT email FROM user WHERE email = '"+email+"'";
  con.query(select, function (err, result) {
    console.log(result)
    console.log(email)  
    if (result.length > 0){
      return res.send({"message":"Duplicate Entry"})
    }
    else{
      var query = "INSERT INTO `user` (bussiness_name,username,password,address,number,email,bussiness_category) VALUES ('"+bussiness_name+"','"+username+"','"+password+"','"+address+"','"+number+"','"+email+"','"+bussiness_category+"')";
      commitQuery(query);
      responseData = {'code':200, 'response': 'User Registered!!'};
      res.header('Access-Control-Allow-Origin', '*');
      res.status(200).send(JSON.stringify(responseData));
      res.end();
    }
  })
}



// UTILITY FUNCTIONS

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

module.exports = {
  register
}