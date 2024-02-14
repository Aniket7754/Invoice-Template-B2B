const path = require('path');
const fs = require('fs');
const { log } = require('util');
const con = require("../../connection/index").con;


function image_path(res, username) {
    var query = "SELECT image FROM user WHERE username = '" + username + "'";
    console.log(username);
    con.query(query, function (err, result) {
        if (err) {
            console.log(err);
            const responseData = { 'code': 500, 'response': err };
            res.header('Access-Control-Allow-Origin', '*');
            res.status(500).send(JSON.stringify(responseData));
            res.end();
        } else {
            const image_path = result[0].image;

            const imagePath = path.join(__dirname, '../../../uploaded_image/', image_path);

            if (fs.existsSync(imagePath)) {
                const imageFile = fs.readFileSync(imagePath);
                const responseData = { 'code': 200, 'response': imageFile };
                console.log(responseData)
                res.setHeader('Content-Type', 'image/jpeg'); 
                res.header('Access-Control-Allow-Origin', '*');
                console.log((imageFile))
                res.status(200).send((responseData));
                res.end();
            } else {
                const responseData = { 'code': 404, 'response': 'Image not found' };
                res.header('Access-Control-Allow-Origin', '*');
                res.status(404).send(JSON.stringify(responseData));
                res.end();
            }
        }
    });
}

module.exports = {
    
    image_path

}