const express = require('express');

const router = express.Router();
const adminRouter = require('./admin');
const clientRouter = require('./client');

router.use('/app', clientRouter);
router.use('/admin', adminRouter);

module.exports = router;
