const path  = require('path');
const express = require('express');

const routeDir = require('../util/path');

const router = express.Router();
const adminController = require('../controllers/admin')

router.get('/add-product', adminController.getAddProduct)

router.post('/add-product', adminController.postAddProduct);

router.get('/products', adminController.getAdminProducts);

router.get('/edit-product/:id', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct); 

router.post('/delete-product', adminController.postDeleteProduct)

exports.router = router;
