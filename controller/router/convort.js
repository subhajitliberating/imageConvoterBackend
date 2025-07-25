const express = require('express');
const router = express.Router();
const upload = require('../midelware/upload'); // ✅ now upload is a function
const ConvortImage = require('../contex/convortContex');

router.post('/convert', upload.single('image'), ConvortImage.ConvortImage);

module.exports = router; // ✅ export just the router
