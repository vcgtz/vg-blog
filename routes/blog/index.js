const express = require('express');

const router = express.Router();

const BlogController = require('../../controllers/blog/blog');

router.get('/', BlogController.index);

module.exports = router;
