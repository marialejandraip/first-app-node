//const products = [];
const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const pathData = path.join(path.dirname(require.main.filename),'data','product.json')

const findProduct = (callback) =>{
  fs.readFile(pathData, (err, fileContent)=>{
    if(err){
      callback([]);
    }else {
      callback(JSON.parse(fileContent));
    }
  })
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title
    this.image = imageUrl
    this.description = description
    this.price = price
  }

  save(){
    //products.push(this)
    findProduct(products => {
      if(this.id){
        const existingProductIndex  = products.findIndex(prod => prod.id === this.id);
        const updateProduct = [...products];
        updateProduct[existingProductIndex] = this;
        fs.writeFile(pathData, JSON.stringify(updateProduct), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this)
        fs.writeFile(pathData, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    })
    // fs.readFile(pathData, (err, fileContent)=>{
    //   console.log(fileContent);
    //   let products = [];
    //   if(!err){
    //     products = JSON.parse(fileContent);
    //   }
    //   products.push(this)
    //   fs.writeFile(pathData, JSON.stringify(products), err => {
    //     console.log(err);
    //   });
    // })
  }

  static deleteById(id) {
    findProduct(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter( p => p.id !== id)
      console.log(typeof(parseInt(product.price)), updatedProducts);
      fs.writeFile(pathData, JSON.stringify(updatedProducts), err => {
        if(!err) {
          //console.log(product.price);
          Cart.deleteProduct(id, parseInt(product.price));
        }
      })
    })
  }

  static fetchAll(callback){
    fs.readFile(pathData, (err, fileContent)=>{
      if(err){
        callback([]);
      }else {
        callback(JSON.parse(fileContent));
      }
    })
    //return products
  }
  static fetchById(id, callback) {
    findProduct(products => {
      const product = products.find( p => p.id === id)
      callback(product)
    })
  }
}
  