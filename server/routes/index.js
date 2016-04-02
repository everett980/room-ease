const express = require('express');
const router = express.Router();
const api = require('./apis/index.js')


router.use('/api', api)


module.exports = router;