const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const { uploadImage } = require('../utils/cloudinaryHelper');
const { protect } = require('../middlewares/auth.middleware');

/**
 * @desc    Upload single image to Cloudinary and return CDN URL
 * @route   POST /api/upload
 * @access  Private/Admin
 */
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file explicitly uploaded' });
    }
    
    const result = await uploadImage(req.file.buffer);
    
    res.status(200).json({ 
      success: true, 
      data: result // Returns { url: string, public_id: string }
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Cloudinary transmission failed completely' });
  }
});

module.exports = router;
