/* eslint-env node */
/**
 * Summary: Contains controller code for the APIs
 */

const DEBUG = require("../lib/debugger")("api-controllers");
const moment = require('moment');
const { con } = require("../connection");
const uploadMiddleware = require('./upload');
// $$$$$$$$$$%%%%%%%%%%################ APPLICATION LEVEL APIs ####################%%%%%%%%$$$$$$$ //
// [/login] BASIC AUTH FUNCTIONS IN APPLICATION, INCLUDES(JWT)
function login(req, res) {
  var username = "";
  var password = "";

  if (req.body.username)
    username = req.body.username;
  if (req.body.password) {
    password = req.body.password;
  }
  console.log('aniket', username)

  if (req.method == 'POST') {
    const helper = require("./helper/auth");
    helper.login(res, username, password)
  }
}

function for_password(req, res) {
  let email = req.body.email;
  console.log('email---', email)

  let new_password = req.body.new_password;


  if (req.method == 'POST') {
    const helper = require("./helper/auth");
    helper.for_password(res, email, new_password)
  }
}
function register(req, res) {
  if (req.method == 'POST') {
    const helper = require("./helper/register");

    var bussiness_name = req.body.bussiness_name;
    var username = req.body.username;
    var password = req.body.password;
    var address = req.body.address;
    var number = req.body.number;
    var email = req.body.email;
    var bussiness_category = req.body.bussiness_category;
    console.log(username)
    helper.register(res, bussiness_name, username, password, address, number, email, bussiness_category)
  }
}



function add_client(req, res) {
  if (req.method == 'POST') {
    const helper = require("./helper/add_client");

    var username = req.body.username.toLowerCase();
    var position = req.body.position;
    var Business_name = req.body.Business_name;
    var industry = req.body.industry;
    var country = req.body.country;
    var city = req.body.office;
    var state = req.body.state;
    var street_address = req.body.street_address;
    var business_alias = req.body.business_alias;
    var unique_key = req.body.unique_key
    var number = req.body.number
    var email = req.body.email
    var vat = req.body.vat
    var zip = req.body.zip
    var gst = req.body.gst;
    var pan = req.body.pan;
    var account_h_name = req.body.account_h_name
    var account_no = req.body.account_no
    var ifsc_code = req.body.ifsc_code
    var swift = req.body.swift
    var bank = req.body.bank
    console.log(username)


    helper.add_client(res, username, position, Business_name, industry, country, city, state, street_address, business_alias, unique_key, number, email, vat, zip, gst, pan, account_h_name, account_no, ifsc_code, swift, bank)
  }
}


function client(req, res) {
  if (req.method == 'GET') {
    const helper = require("./helper/add_client");
    var username = "";

    if (req.query.username) {
      username = req.query.username


    }


    helper.client(res, username)
  }

}

function invoice(req, res) {
  if (req.method == 'GET') {
    const helper = require("./helper/invoice");

    var username = req.query.username;
    // var position = req.body.position;
    // var office = req.body.email;
    // var age= req.body.age;
    // var startdate = req.body.startdate;
    // var status = req.body.status;
    console.log(username)


    helper.invoice(res, username)
  }
}




function cre_invoice(req, res) {
  if (req.method == 'POST') {
    const helper = require("./helper/invoice");
    var username = req.body.username;
    var invoice_date = req.body.invoice_date;
    var invoice_no = req.body.invoice_no;
    var billed_to = req.body.billed_to;
    var amount = req.body.amount;
    var status = req.body.status;
    var due_date = req.body.due_date;
    var taxSelect = req.body.taxSelect;
    var currency = req.body.currency;
    var items = req.body.items;
    var note = req.body.note;
    var terms = req.body.terms;



    helper.cre_invoice(res, invoice_date, invoice_no, billed_to, amount, status, due_date
      , username, taxSelect, currency, items, note, terms)
  }
}

function credit(req, res) {
  if (req.method == 'GET') {
    const helper = require("./helper/credit");

    var username = req.query.username;
    console.log("aniket", username)




    helper.credit(res, username)
  }
}
function file_path(req, res) {
  if (req.method == 'POST') {
    const helper = require("./helper/invoice");
    console.log("ok")

    var username = req.body.username;
    var file_path = req.body.file_path;

    // console.log("aniket",username)




    helper.file_path(res, username, file_path)
  }
}

function create_credit(req, res) {
  if (req.method == 'POST') {
    const helper = require("./helper/credit");

    var username = req.body.username;

    var credit_date = req.body.credit_date;
    var credit_note = req.body.note;
    var invoice_no = req.body.invoice_no;
    var credit_no = req.body.credit_no
    var credit_issued = req.body.credit_issued;
    var amount = req.body.amount;
    var status = req.body.status
    var billed_to = req.body.billed_to;
    var tax = req.body.taxSelect;
    var items = req.body.items;
    var add_terms = req.body.add_terms;

    console.log(credit_no)
    helper.create_credit(res, username, credit_date, credit_note, invoice_no, credit_no, credit_issued, amount, status, billed_to, tax, items, add_terms)
  }
}


function details(req, res) {
  if (req.method == 'GET') {
    const helper = require("./helper/add_client");
    var username = "";
    if (req.query.username) {
      username = req.query.username
    }


    helper.details(res, username)
  }

}

function userdata(req, res) {
  if (req.method == 'GET') {
    const helper = require("./helper/add_client");



    helper.userdata(res)
  }

}

function client_show(req, res) {
  if (req.method == 'GET') {
    const helper = require("./helper/add_client");
    var Business_name = "";
    if (req.query.Business_name) {
      Business_name = req.query.Business_name
    }


    helper.client_show(res, Business_name)
  }

}

function profile(req, res) {
  console.log("aniket");
  if (req.method == 'POST') {
    const helper = require("./helper/profile");

    username = req.body.username,
      bussiness_name = req.body.bussiness_name,
      brand_name = req.body.brand_name,
      team_size = req.body.team_size,
      website = req.body.website,
      business_date = req.body.business_date,
      business_category = req.body.business_category,
      tagline = req.body.tagline,
      country = req.body.country,
      state = req.body.state,
      city = req.body.city,
      pincode = req.body.pincode,
      street_address = req.body.street_address,
      tax_type = req.body.tax_type,
      pancard_number = req.body.pancard_number,
      gst = req.body.gst,

      account_h_name = req.body.account_h_name,
      account_no = req.body.account_no,
      ifsc_code = req.body.ifsc_code,
      swift = req.body.swift,
      bank = req.body.bank


    console.log("=========", username);
    helper.profile(res, username, bussiness_name, brand_name, team_size, website, business_date, business_category, tagline, country, state, city, pincode, street_address, tax_type, pancard_number, account_h_name, account_no, ifsc_code, swift, bank, gst);
  }
}


function invoice_data(req, res) {
  if (req.method == 'POST') {
    const helper = require("./helper/invoice_data");
    var username = req.query.username;
    var invoice_no = req.body.invoice_no;
    var invoice_date = req.body.invoice_date;
    var due_date = req.body.due_date;
    var currency = req.body.currency;
    var items = req.body.items
    var notes = req.body.notes;
    var add_terms = req.body.add_terms;

    console.log("=========", business_category)
    helper.invoice_data(res, username, invoice_no, invoice_date, due_date, currency, items, notes, add_terms)
  }
}


function invoice_no(req, res) {
  if (req.method == 'GET') {
    const helper = require("./helper/invoice_data");
    var username = "";
    if (req.query.username) {
      username = req.query.username
    }


    helper.invoice_no(res, username)
  }

}

function user_data(req, res) {
  if (req.method == 'GET') {
    const helper = require("./helper/invoice_data");

    const username = req.query.username
    helper.user_data(res, username)
  }

}

function image_path(req, res) {
  if (req.method == 'GET') {
    const helper = require("./helper/image_path");

    const username = req.query.username
    console.log('----',username)
    helper.image_path(res, username)
  }

}


function get_invoice(req, res) {
  if (req.method == 'GET') {
    const helper = require("./helper/invoice");

    const username = req.query.username;
    const invoice_no = req.query.invoice_no;
    console.log(username)
    helper.get_invoice(res, username, invoice_no)
  }

}
const fs = require('fs');
const path = require('path');

const uploadImage = (req, res) => {
  // Access the buffer containing the image data
  const imageBuffer = req.file.buffer;

  // Generate a unique filename or use the original filename
  const fileName = Date.now() + '_' + req.file.originalname;

  // Specify the path to save the uploaded image
  const imagePath = path.join(__dirname, 'uploaded_images', fileName);

  // Write the image buffer to a file on disk
  fs.writeFile(imagePath, imageBuffer, (err) => {
    if (err) {
      console.error('Error saving image:', err);
      return res.status(500).json({ error: 'Error saving image' });
    }

    // Process the image further if needed
    console.log('Image saved successfully:', fileName);

    // Send a response to the client
    res.json({ message: 'Image uploaded and saved successfully', fileName });
  });
};

module.exports = {
  uploadImage,
};

module.exports = {

  login,
  register,
  for_password,
  add_client,
  client,
  invoice,
  cre_invoice,
  credit,
  details,
  create_credit,
  client_show,
  file_path,
  userdata,
  profile,
  invoice_data,
  invoice_no,
  user_data,
  image_path,
  get_invoice,
  


}