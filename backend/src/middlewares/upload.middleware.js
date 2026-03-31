const multer = require('multer');

// Store files firmly in memory buffer so we can stream them directly to Cloudinary without persisting locally
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Exact 5MB cutoff
  },
  fileFilter: (req, file, cb) => {
    // Only accept distinct image mime types
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Format Error: Only image files are allowed!'), false);
    }
  }
});

module.exports = upload;
