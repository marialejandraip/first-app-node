const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product',{
    docTitle:'Add Product', 
    path:'/admin/add-product',
    editing:false
  })
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll()
  //Product.findAll()
  .then(products => {
    res.render('admin/products-list', {
      docTitle:'Products', 
      prods: products, 
      path:'/admin/products', 
      editing:false
    })
  }).catch(err => console.log(err))
  // Product.fetchAll(products => {
  // })
};

//peticiones al formulario con los respectivos name del html
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl, null, req.user._id);
  product.save()
    .then(result => {
      console.log(result);
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
  };
  
  exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
      res.redirect('/')
    }
    const prodId = req.params.id;
    Product.findById(prodId)
    .then(product => {
      if(!product){
        return res.redirect('/');
      }
      res.render('admin/edit-product',{
        docTitle:'Edit Product', 
        path:'/admin/edit-product', 
        editing: editMode, 
        product:product
      });
    }).catch(err => console.log(err))
  }

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updateTitle = req.body.title;
  const updatePrice = req.body.price;
  const updateDescription = req.body.description;
  const updateImage = req.body.imageUrl;

  const product = new Product(updateTitle, updatePrice, updateDescription, updateImage, prodId)
  product.save().then(result => {
    console.log('UPDATED PRODUCT!' + result);
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
  .then(() => {
    console.log('PRODUCT DELETED!');
    res.redirect('/admin/products')
  })
  .catch(err => console.log(err));
}