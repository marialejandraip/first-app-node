const express = require('express');
const shopController = require('../controllers/shop')

const routeDir = require('../util/path');
const adminData = require('../routes/admin');

const router = express.Router();

//.get require exact match
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);
router.get('/products/:id', shopController.getProduct);

router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);  
router.post('/cart-delete-item', shopController.postCartDeleteItem);

router.get('/order', shopController.getOrder);
router.post('/create-order', shopController.postOrder)
// router.get('/checkout', shopController.getCheckout);

module.exports = router;
