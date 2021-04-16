const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product',{
    docTitle:'Add Product', 
    path:'/admin/add-product',
    editing:false
  })
};

exports.getAdminProducts = (req, res, next) => {
  req.user.getProducts()
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

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    res.redirect('/')
  }
  const prodId = req.params.id;
  req.user.getProducts({where:{id:prodId}})
  //Product.findByPk(prodId)
  .then(products => {
    const product = products[0];
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
//peticiones al formulario con los respectivos name del html
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //two ways to connect user with products modules now knows each other
  // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description,
  //   userId: req.user.id
  // })
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(result => {
    console.log(result);
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
  // const product = new Product(null, title, price, description, imageUrl);
  // console.log(product);
  //   product
  //     .save()
  //     .then((result) => {
  //       console.log(result);
  //       res.redirect('/')
  //     })
  //     .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updateTitle = req.body.title;
  const updatePrice = req.body.price;
  const updateDescription = req.body.description;
  const updateImage = req.body.imageUrl;

  Product.findByPk(prodId)
  .then( product => {
    product.title = updateTitle;
    product.price = updatePrice;
    product.description = updateDescription;
    product.imageUrl = updateImage; 
    return product.save();
  }).then(result => {
    console.log('UPDATED PRODUCT!' + result);
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));

  // const updatedProduct = new Product(prodId, updateTitle, updateImage, updateDescription, updatePrice);
  // updatedProduct.save()
  //   .then(()=> {
  //     res.redirect('/admin/products');
  //   })
  //   .catch(err => console.log(err));
  //Construct a new product 
  // Replace it 
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId).then(product => {
    return product.destroy();
  }).then(result => {
    console.log('PRODUCT DELETED!');
    res.redirect('/admin/products')
  })
  .catch(err => console.log(err));
  //Product.deleteById(prodId);
}