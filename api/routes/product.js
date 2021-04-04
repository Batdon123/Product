const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/prod1');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controllers/prod');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 100
    },
    fileFilter: fileFilter
});

router.get('/', ProductController.product_get_all);

router.post('/', checkAuth, upload.single('productimage'), ProductController.product_create);

router.get('/:productId', ProductController.product_get_product);

router.patch('/:productId', checkAuth, ProductController.product_update);


router.delete('/:productId', checkAuth, ProductController.product_delete);


module.exports = router;