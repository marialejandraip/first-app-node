const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
  constructor(username, email, cart, id){
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users')
    .insertOne(this)
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err))
  }

  addToCart(product) {
    const cartProducts = this.cart.items.findIndex(cp => {
      console.log('AQUI', typeof(cp.productId));
      return cp.productId.toString() === product._id.toString();
    })
    let newQuantity = 1;
    const updateCartItems = [...this.cart.items];

    if(cartProducts >= 0) {
      newQuantity = this.cart.items[cartProducts].quantity + 1;
      updateCartItems[cartProducts].quantity = newQuantity;
    } else {
      updateCartItems.push({
        productId: new mongodb.ObjectId(product._id), 
        quantity: newQuantity
      })
    }
    // aqui puede ingresar todo el obj de producto completo {...product, quantity: 1 }
    //Other way to add itemes {productId: product._id, quantity: newQuantity}
    const updateCart = {items: updateCartItems }
    const db = getDb();
    return db.collection('users').updateOne(
      {_id: new mongodb.ObjectId(this._id)}, 
      {$set: {cart:updateCart}} 
      );
  }

  getCart () {
  //   //Si en la coleccion de user estuvieran todos los datos de productos en item 
  //   //return this.cart;
  //   //Peroooo no es así 
  const db = getDb();
  const productsIds = this.cart.items.map(ids => {
      return ids.productId
    })
return db
.collection('products')
.find({_id: {$in: productsIds}})
.toArray()
.then(products => {
  return products.map(p => {
    return {...p, quantity: this.cart.items.find(i => {
      return i.productId.toString() === p._id.toString();
    }).quantity
    }
  })
  })
  }

  deleteItem (prodId) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== prodId.toString();
    })
    const db = getDb();
    return db.collection('users').updateOne(
      {_id: new mongodb.ObjectId(this._id)}, 
      {$set: {cart: {items: updatedCartItems}}} 
      );
  }


  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({_id: new  mongodb.ObjectId(userId)})
    .then(user => {
      console.log(user)
      return user
    })
    .catch(err => console.log(err))
  }
}

module.exports = User;
