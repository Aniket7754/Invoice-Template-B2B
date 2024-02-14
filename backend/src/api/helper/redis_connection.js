const redis = require("redis");
const express = require('express')
const util = require("util")

// const redisConf = {
//     host: "localhost",
//     port: "6379",
//     pass: "....."
// }
// If we are giving blank in creatreclient, then it is accessing the localhost, and if we want to access with anyother server/pass , then we have to put inside the bracket
const client = redis.createClient();  
const app = express();
client.set = util.promisify(client.set)
client.get = util.promisify(client.get)

app.use(express.json())

client.on("error", function(error){
    console.error("Error encountered: ", error);
})
client.on("connect", function(error){
    console.log("Redis Connected !!");
})
