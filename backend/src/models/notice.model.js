const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Notice title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters']
    },
    description: {
      type: String,
      required: [true, 'Notice description is required']
    },
    image: {
      type: String,
      default: '' // Cloudinary securely hosted image URL
    },
    category: {
      type: String,
      enum: ['General', 'Event', 'Urgent', 'Information'],
      default: 'General'
    },
    pinned: {
      type: Boolean,
      default: false
    },
    priority: {
      type: Number,
      default: 0 // Used for manual sorting logic
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    },
    startDate: {
      type: Date,
      default: Date.now // Indicates when a notice should become publicly visible
    },
    endDate: {
      type: Date // Optional: if present, the notice auto-hides after this date
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'Admin',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Compound Index: Optimizes the public query that grabs "published", currently active notices,
// sorted by whether they are pinned and their manual priority level.
noticeSchema.index({ status: 1, pinned: -1, priority: -1 });

// Time-based queries optimization
noticeSchema.index({ startDate: 1, endDate: 1 });

module.exports = mongoose.model('Notice', noticeSchema);
