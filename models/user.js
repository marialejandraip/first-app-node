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
      return cp._id == product._id;
    })
    let newQuantity = 1;
    const updateCartItems = [...this.cart.items];

    if(cartProducts >= 0) {
      newQuantity = this.cart.items[cartProducts].quantity + 1;
      updateCartItems[cartProducts].quantity = newQuantity;
    } else {
      updateCartItems.push({productId: product._id, quantity: newQuantity})
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
