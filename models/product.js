const db = require('../util/database');
const Cart = require('./cart');

//const pathData = path.join(path.dirname(require.main.filename),'data','product.json')

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
  constructor(id, title, price, description, imageUrl) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save(){
    return db.execute('INSERT INTO products(title, price, description, imageUrl) VALUES (?, ?, ?, ?)',[this.title, this.price, this.description, this.imageUrl])
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

  static fetchAll(){
    return db.execute('SELECT * FROM products');
  }

  static fetchById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
  }
}
  