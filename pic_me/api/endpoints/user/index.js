const router = require('express').Router();

/**
 * /api/users
 *
 * routes for user endpoint
 */
router.use('/', require('./routes/root'));
router.use('/all', require('./routes/all'));
router.use('/auth', require('./routes/auth'));
router.use('/info', require('./routes/info'));
router.use('/login', require('./routes/login'));
router.use('/logout', require('./routes/logout'));
router.use('/payment', require('./routes/payment'));
router.use('/settings', require('./routes/settings'));

module.exports = router;
