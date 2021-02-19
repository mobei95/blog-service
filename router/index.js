const express = require('express');
const router = express.Router();
const adminRouter = require('../controller/admin/index')
const clientRouter = require('../controller/client/index')

router.use('/app', clientRouter)
router.use('/admin', adminRouter)
return NaN

module.exports = router;