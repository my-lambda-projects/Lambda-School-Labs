const usersRouter    = require('./users/usersRouter.js');
const alertsRouter   = require('./alerts/alertsRouter.js');
const express        = require('express');
const router         = express.Router();

router.use(usersRouter);
router.use(alertsRouter);

module.exports = router;
