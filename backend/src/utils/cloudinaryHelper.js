const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

const isCloudinaryConfigured = process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_KEY !== 'your_cloudinary_api_key';

/**
 * Uploads a buffer directly to Cloudinary using their upload stream 
 * or saves locally if Cloudinary is not configured.
 */
const uploadImage = async (fileBuffer) => {
  if (!isCloudinaryConfigured) {
    return new Promise((resolve, reject) => {
      try {
        const uploadsDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const finalName = `upload_${Date.now()}_${Math.random().toString(36).substring(7)}.png`;
        const filePath = path.join(uploadsDir, finalName);
        fs.writeFileSync(filePath, fileBuffer);
        
        const PORT = process.env.PORT || 5000;
        const localUrl = `http://localhost:${PORT}/uploads/${finalName}`;
        resolve({ url: localUrl, public_id: finalName });
      } catch (err) {
        reject(err);
      }
    });
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'smart-board', format: 'webp', transformation: [{ quality: 'auto', fetch_format: 'auto' }] },
      (error, result) => {
        if (error) reject(error);
        else resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );
    // Push the raw memory buffer through the stream securely
    stream.end(fileBuffer);
  });
};

/**
 * Cleanup helper for destroying replaced images natively
 */
const deleteImage = async (publicId) => {
  if (!publicId) return;
  
  if (!isCloudinaryConfigured) {
    try {
      const filePath = path.join(__dirname, '../../uploads', publicId);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error('Local file deletion failed:', err);
    }
    return;
  }

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary deletion failed:', error);
  }
};

module.exports = { uploadImage, deleteImage };
