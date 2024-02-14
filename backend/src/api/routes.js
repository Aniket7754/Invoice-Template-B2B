/* eslint-env node */
/**
 * Summary: Initialize routes for API application
 */
const CONTROLLERS = require("./controllers");

const con = require('./../connection/index').con;
const uploadMiddleware = require('./upload');

const BASE_URL = "/api/v1";

module.exports = function routes(router) {
  router.post(`${BASE_URL}/login`, CONTROLLERS.login);
  router.post(`${BASE_URL}/register`, CONTROLLERS.register);
  router.post(`${BASE_URL}/for_password`, CONTROLLERS.for_password);
  router.post(`${BASE_URL}/add_client`, CONTROLLERS.add_client);
  router.get(`${BASE_URL}/client`, CONTROLLERS.client);
  router.get(`${BASE_URL}/invoice`, CONTROLLERS.invoice);
  router.post(`${BASE_URL}/create_invoice`, CONTROLLERS.cre_invoice);
  router.post(`${BASE_URL}/create_credit`, CONTROLLERS.create_credit);
  router.get(`${BASE_URL}/details`, CONTROLLERS.details);
  router.get(`${BASE_URL}/credit`, CONTROLLERS.credit);
  router.get(`${BASE_URL}/client_show`, CONTROLLERS.client_show);
  router.post(`${BASE_URL}/file_path`, CONTROLLERS.file_path);
  router.get(`${BASE_URL}/userdata`, CONTROLLERS.userdata);
  router.post(`${BASE_URL}/profile`, CONTROLLERS.profile);
  router.post(`${BASE_URL}/invoice_data`, CONTROLLERS.invoice_data);
  router.get(`${BASE_URL}/invoice_no`, CONTROLLERS.invoice_no);
  router.get(`${BASE_URL}/user_data`, CONTROLLERS.user_data);
  router.get(`${BASE_URL}/image_path`, CONTROLLERS.image_path);
  router.get(`${BASE_URL}/get_invoice`, CONTROLLERS.get_invoice);





  router.post(`${BASE_URL}/upload_image`, uploadMiddleware.uploadVideo, (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
  
    var query = "UPDATE `user` SET image = '" + req.file.filename + "' WHERE username = '" + req.body.username + "'";
    con.query(query , (mysqlErr, mysqlResult) => {
      if (mysqlErr) {
        res.status(500).json({ error: 'Failed to insert video URL into MySQL' });
      } else {
        res.json({ message: 'File uploaded successfully', result: mysqlResult });
      }
    });
  });
  
  
  
  
 
}