const path  = require('path');
const express = require('express');

const routeDir = require('../util/path');

const router = express.Router();
const adminController = require('../controllers/admin')
//const products = [];
//change action in form
router.get('/add-product', adminController.getAddProduct)

// (req, res, next)=>{
//   //res.send('<h1>Add product</h1> <form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">add</button></form>')
//   //sendFile html __dirname, '..' replaced by routeDir
//   // res.sendFile(path.join(routeDir, 'views', 'add-product.html'));
//   //render with pug
//   res.render('add-product',{docTitle:'Add Product', path:'/admin/add-product'})
// })

router.post('/add-product', adminController.postAddProduct);

// (req, res, next) => {
//   products.push({title: req.body.title})
//   res.redirect('/')
// })
router.get('/products', adminController.getAdminProducts);

router.get('/edit-product/:id', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct); 

router.post('/delete-product', adminController.postDeleteProduct)

exports.router = router;
//exports.products = products;
