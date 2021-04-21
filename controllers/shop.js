const Product = require('../models/product');
//const Cart = require('../models/cart');

// Here is the path '/'
exports.getIndex = (req, res, next)=>{
  Product.fetchAll().then(products => {
    res.render('shop/index', {
      docTitle:"My Shop!", 
      prods: products, 
      path:"/"
    })

  }).catch(err => console.log(err))
};

// Here path is 'products'
exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
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
  Product.findById(prodId)
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
  req.user.getCart()
    .then(products => {
      res.render('shop/cart', {
        docTitle:'Cart', 
        path:'cart',
        products: products
      }) 
    })
    .catch(err => console.log(err));
}

//here add product to the cart 
exports.postCart = (req, res, next) => {
  const productId = req.body.prodId;
  Product.findById(productId)
  .then(product => {
    return req.user.addToCart(product);
  })
  .then(result => {
    res.redirect('/cart')
    console.log(result);
  })
  .catch(err => console.log(err))
}

// Here i dont wanna buy it anymore 
exports.postCartDeleteItem = (req,res,next) => {
  const productId = req.body.prodId;
  req.user.deleteItem(productId)
  .then(result => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err))
}

// exports.getOrder = (req, res, next) => {

//   req.user.getOrders({include: ['products']})
//   .then(orders => {
//     res.render('shop/order', {
//       docTitle:'Order', 
//       path:'order',
//       orders: orders
//     })

//   })
//   .catch(err => console.log(err))
// }

// exports.postOrder = (req, res, next) => {
//   let fetchedCart ;

//   req.user.getCart()
//   .then(cart => {
//     fetchedCart = cart;
//     return cart.getProducts();
//   })
//   .then(products => {
//     //console.log(products);
//     return req.user.createOrder()
//     .then(order => {
//       return order.addProduct(products.map( product => {
//         product.orderItem = {quantity: product.cartItem.quantity};
//         return product
//       }))
//     })
//     .catch(err => console.log(err));
//   })
//   .then(result => {
//     return fetchedCart.setProducts(null)
//   })
//   .then(() => {
//     res.redirect('/order')

//   })
//   .catch(err => console.log(err))
// }

// exports.getCheckout = (req, res, next) => {
//   req.user.getOrder()
//   .then(orders => {
//     res.render('shop/checkout', {
//       docTitle:'checkout', 
//       path:'checkout',
//       orders: orders
//     })

//   })
//   .catch(err => console.log(err))
// }
