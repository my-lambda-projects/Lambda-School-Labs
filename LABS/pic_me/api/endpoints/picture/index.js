const router = require('express').Router();

/**
 * /api/pictures
 *
 * routes for picture endpoint
 */
router.use('/', require('./routes/root'));
router.use('/mycollection', require('./routes/mycollection'));
router.use('/myuploads', require('./routes/myuploads'));
router.use('/othermes', require('./routes/othermes'));
router.use('/upload', require('./routes/upload'));

module.exports = router;
