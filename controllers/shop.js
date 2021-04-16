const Product = require('../models/product');
const Cart = require('../models/cart');

// Here is the path '/'
exports.getIndex = (req, res, next)=>{
  Product.findAll().then(products => {
    res.render('shop/index', {
      docTitle:"My Shop!", 
      prods: products, 
      path:"/"
    })

  }).catch(err => console.log(err))
};

// Here path is 'products'
exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/product-list', {
      docTitle:'Products', 
      prods: products, 
      path:'/products'
    })
  }).catch(err => console.log(err))
}

// Here get just one product by id 
exports.getProduct = (req, res, next) => {
  const prodId = req.params.id
  console.log(prodId)
  // Product.findAll({where:{id: prodId}})
  // .then((product) => {
  //   res.render('shop/product-detail',{ 
  //     product:product[0],  
  //     docTitle:product[0].title, 
  //     path:'/products'
  //   })
  // })
  // .catch(err => console.log(err));
  // Other way to find by id 
  Product.findByPk(prodId)
    .then((product) => {
      res.render('shop/product-detail',{ 
        product:product,  
        docTitle:'Detail', 
        path:'/products'
      })
    })
  .catch(err => console.log(err));
}


// The cart list '/cart'
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

// here add product to the cart 
exports.postCart = (req, res, next) => {
  const productId = req.body.prodId;
  console.log(productId);
  Product.fetchById(productId, product => {
    Cart.addProduct(productId, product.price);
  })
  res.redirect('/cart')
}

// Here i dont wanna buy it anymore 
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
