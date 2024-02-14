const con = require("../../connection/index").con;

// function profile(res, username, bussiness_name, brand_name, team_size, website, business_date, business_category, tagline, country, state, city, pincode, street_address, tax_type, pancard_number, account_h_name, account_no, ifsc_code, swift, bank) {
//     var select = `SELECT * FROM profile WHERE username='${username}'`;

//     con.query(select, function (err, result) {
//         console.log(result)
//         if (err) {
//             console.log(err);
//             return res.status(500).send({ "message": "Internal Server Error" });
//         }

//         if (result.length === 0) {
//             return res.status(404).send({ "message": "Profile not found for the given username" });
//         } else {
//             var fields = {
//                 bussiness_name,
//                 brand_name,
//                 team_size,
//                 website,
//                 business_date,
//                 business_category,
//                 tagline,
//                 country,
//                 state,
//                 city,
//                 pincode,
//                 street_address,
//                 tax_type,
//                 pancard_number,
//                 account_h_name,
//                 account_no,
//                 ifsc_code,
//                 swift,
//                 bank
//             };

//             var fieldUpdates = "";
//             for (var field in fields) {
//                 if (fields[field] !== undefined) {
//                     fieldUpdates += `${field} = '${fields[field]}', `;
//                 }
//             }
//             fieldUpdates = fieldUpdates.slice(0, -2); // Remove the trailing comma and space
//             console.log("--------",fieldUpdates)
//             var query = `UPDATE profile SET ${fieldUpdates} WHERE username='${username}'`;

//             commitQuery(query, res);
//         }
//     });
// }


// function profile(res, username, bussiness_name, brand_name, team_size, website, business_date, business_category, tagline, country, state, city, pincode, street_address, tax_type, pancard_number, account_h_name, account_no, ifsc_code, swift, bank) {
//     var select = `SELECT * FROM profile WHERE username='${username}'`;

//     con.query(select, function (err, result) {
//         console.log(result)
//         if (err) {
//             console.log(err);
//             return res.status(500).send({ "message": "Internal Server Error" });
//         }

//         if (result.length === 0) {
//             return res.status(404).send({ "message": "Profile not found for the given username" });
//         } else {
//             var fields = {
//                 bussiness_name,
//                 brand_name,
//                 team_size,
//                 website,
//                 business_date,
//                 business_category,
//                 tagline,
//                 country,
//                 state,
//                 city,
//                 pincode,
//                 street_address,
//                 tax_type,
//                 pancard_number,
//                 account_h_name,
//                 account_no,
//                 ifsc_code,
//                 swift,
//                 bank
//             };

//             var fieldUpdates = "";
//             for (var field in fields) {
//                 if (fields[field] !== undefined) {
//                     fieldUpdates += `${field} = '${fields[field]}', `;
//                 }
//             }
//             fieldUpdates = fieldUpdates.slice(0, -2); // Remove the trailing comma and space
//             console.log("--------",fieldUpdates)
//             var query = `UPDATE profile SET ${fieldUpdates} WHERE username='${username}'`;

//             commitQuery(query, res);
//         }
//     });
// }

function profile(res, username, bussiness_name, brand_name, team_size, website, business_date, business_category, tagline, country, state, city, pincode, street_address, tax_type, pancard_number, account_h_name, account_no, ifsc_code, swift, bank,gst) {

    var query_1 = "UPDATE `user` SET ";
    var updateFields = [];
    if (bussiness_name) updateFields.push("`bussiness_name` = '" + bussiness_name + "'");
    if (gst) updateFields.push("`gst` = '" + gst + "'");

    if (brand_name) updateFields.push("`brand_name` = '" + brand_name + "'");
    if (team_size) updateFields.push("`team_size` = '" + team_size + "'");
    if (website) updateFields.push("`website` = '" + website + "'");
    if (business_date) updateFields.push("`business_date` = '" + business_date + "'");
    if (business_category) updateFields.push("`business_category` = '" + business_category + "'");
    if (tagline) updateFields.push("`tagline` = '" + tagline + "'");
    if (country) updateFields.push("`country` = '" + country + "'");
    if (city) updateFields.push("`city` = '" + city + "'");
    if (state) updateFields.push("`state` = '" + state + "'");
    if (pincode) updateFields.push("`pincode` = '" + pincode + "'");
    if (street_address) updateFields.push("`street_address` = '" + street_address + "'");
    if (tax_type) updateFields.push("`tax_type` = '" + tax_type + "'");
    if (pancard_number) updateFields.push("`pancard_number` = '" + pancard_number + "'");
    if (account_h_name) updateFields.push("`account_h_name` = '" + account_h_name + "'");
    if (account_no) updateFields.push("`account_no` = '" + account_no + "'");
    if (ifsc_code) updateFields.push("`ifsc_code` = '" + ifsc_code + "'");
    if (swift) updateFields.push("`swift` = '" + swift + "'");
    if (bank) updateFields.push("`bank` = '" + bank + "'");
   
    query_1 += updateFields.join(', ');
    query_1 += " WHERE `username` = '" + username + "' ";
    console.log(query_1)
    con.query(query_1, function (err, result) {
        if (err) {
            console.log(err);
            const responseData = { 'code': 500, 'response': err };
            res.header('Access-Control-Allow-Origin', '*');
            res.status(500).send(JSON.stringify(responseData));
            res.end();
        }
        else {
            responseData = { 'code': 200, 'response': "updated" };
            res.header('Access-Control-Allow-Origin', '*');
            res.status(200).send(JSON.stringify(responseData));
            res.end();
        }

    });
}

module.exports = {
    profile,
};

