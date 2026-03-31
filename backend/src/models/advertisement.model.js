const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Advertisement title is required'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'Advertisement image is required'] // Target Cloudinary URL
    },
    targetUrl: {
      type: String,
      match: [
        /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
        'Please use a valid URL with HTTP or HTTPS'
      ]
    },
    position: {
      type: Number,
      default: 0 // Ascending order layout position
    },
    active: {
      type: Boolean,
      default: true
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date // Optional auto-hide condition date
    }
  },
  {
    timestamps: true
  }
);

// Index to efficiently list active ads sorted by their specific structural UI position
advertisementSchema.index({ active: 1, position: 1 });
advertisementSchema.index({ startDate: 1, endDate: 1 });

module.exports = mongoose.model('Advertisement', advertisementSchema);
