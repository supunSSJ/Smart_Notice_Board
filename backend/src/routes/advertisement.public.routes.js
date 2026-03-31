const express = require('express');
const { getPublicAds } = require('../controllers/advertisement.controller');

const router = express.Router();

// Exposes exclusively active/scheduled advertisements publicly natively optimized
router.get('/', getPublicAds);

module.exports = router;
