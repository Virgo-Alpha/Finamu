// middleware/upload.js
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

module.exports = upload;
