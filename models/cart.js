const fs = require('fs');
const path = require('path');

const pathData = path.join(path.dirname(require.main.filename),'data','cart.json')

module.exports = class Cart {
  static addProduct(id, productPrice) {
    //Fetch the previous cart
    fs.readFile( pathData, (err, fileContent) => {
      let cart = { products:[], totalPrice: 0 };
      if(!err) {
        cart = JSON.parse(fileContent);

      }
      //Analyze the cart, find existing products
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProducts = cart.products[existingProductIndex];
      let updatedProduct;

      //Add new product / increase quantity 
      if(existingProducts) {
        updatedProduct = {...existingProducts};
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct; 
      } else{
        updatedProduct = {id:id, qty:1 }
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice
      fs.writeFile(pathData, JSON.stringify(cart), err => {
        console.log(err);
      })
    })
  };

  static deleteProduct(id, productPrice) {
    fs.readFile( pathData, (err, fileContent) => {
      if(err){
        return;
      }
      //Cart needs to be parse to fileContent
      const updatedCart = {...JSON.parse(fileContent)};
      const product = updatedCart.products.find(prod => prod.id === id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice*productQty;
      fs.writeFile(pathData, JSON.stringify(updatedCart), err => {
        console.log(err);
      })
    })
  };

  static getProductsCart(callback) {
    fs.readFile( pathData, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if(err) {
        callback(null);
      }else {
        callback(cart);
      }
    })
  };
}
