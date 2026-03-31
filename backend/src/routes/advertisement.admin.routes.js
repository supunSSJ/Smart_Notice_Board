const express = require('express');
const {
  createAd,
  getAdminAds,
  getAdById,
  updateAd,
  deleteAd
} = require('../controllers/advertisement.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Enforce JWT protect middleware strictly on all admin ad actions
router.use(protect);

router.route('/')
  .post(createAd)
  .get(getAdminAds);

router.route('/:id')
  .get(getAdById)
  .put(updateAd)
  .delete(deleteAd);

module.exports = router;
