const Product = require('../models/product');

exports.getAddProduct = (req, res, next)=>{
  res.render('admin/add-product',{docTitle:'Add Product', path:'/admin/add-product'})
};

exports.getAdminProducts = (req, res, next)=>{
  res.render('admin/products-list',{docTitle:'Admin Product', path:'/admin/product'})
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/')
};

exports.getProduct = (req, res, next)=>{
  Product.fetchAll(products => {
    res.render('shop/product-list', {docTitle:"My Shop!", prods: products, path:"/", hasProducts:products.length>0})
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {docTitle:'Cart', path:'cart'})
}

exports.getProducts = (req, res, next) => {
  res.render('shop/product-detail', {docTitle:'product', path:'products'})
}

