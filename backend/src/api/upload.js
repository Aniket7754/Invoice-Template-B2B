const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploaded_image/';

    // Create the 'uploads' directory 
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    

    cb(null, (file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = {
  uploadVideo: upload.single('files'),

};

