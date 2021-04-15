const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next)=>{
  Product.fetchAll(products => {
    res.render('shop/index', {
      docTitle:"My Shop!", 
      prods: products, 
      path:"/"
    })
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      docTitle:'Products', 
      prods: products, 
      path:'products'
    })
  })
}
exports.getProduct = (req, res, next) => {
  const prodId = req.params.id
  console.log(prodId);
  Product.fetchById(prodId, product => {
    console.log('hereeeee!'+product);
    res.render('shop/product-detail',{ 
      product:product, 
      docTitle: 'Detail', 
      path:'/products'
    })
  });
}

exports.getCart = (req, res, next) => {
  Cart.getProductsCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for(product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if(cartProductData){
          cartProducts.push({productData:product, qty: cartProductData.qty});
        }
      }
      res.render('shop/cart', {
        docTitle:'Cart', 
        path:'cart',
        products: cartProducts
      }) 
    })
  });
}

exports.postCart = (req, res, next) => {
  const productId = req.body.prodId;
  console.log(productId);
  Product.fetchById(productId, product => {
    Cart.addProduct(productId, product.price);
  })
  res.redirect('/cart')
}

exports.postCartDeleteItem = (req,res,next) => {
  const productId = req.body.prodId;
  Product.fetchById(productId, product => {
    console.log(product.price);
    Cart.deleteProduct(productId, parseInt(product.price));
    res.redirect('/cart');
  })

}

exports.getOrder = (req, res, next) => {
  res.render('shop/order', {
    docTitle:'Order', 
    path:'order'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    docTitle:'checkout', 
    path:'checkout'
  })
}
