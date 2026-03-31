const express = require('express');
const authRoutes = require('./auth.routes');
const noticeRoutes = require('./notice.routes');
const adAdminRoutes = require('./advertisement.admin.routes');
const adPublicRoutes = require('./advertisement.public.routes');
const uploadRoutes = require('./upload.routes');

const router = express.Router();

// Mount individual collection routers
router.use('/auth', authRoutes);
router.use('/notices', noticeRoutes);
router.use('/admin/advertisements', adAdminRoutes);
router.use('/public/advertisements', adPublicRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;
