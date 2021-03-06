//onst http = require('http'); //import file with path or module like this
const path = require('path');
const express = require('express');
const sequelize = require('./util/database');

const PORT = 3000;
const routerAdmin = require('./routes/admin');
const routerShop = require('./routes/shop')
const errorController = require('./controllers/error');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

/* EJS */
app.set('view engine', 'ejs');
app.set('views', 'views')

//Parse the incoming request body first of all
app.use(express.urlencoded({extended:false}));
//Para leer documentos estaticos en directorio publico(donde estan los estilos)
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) => {
  User.findByPk(1).then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err))
})

app.use(routerShop);
app.use('/admin',routerAdmin.router);

app.use('/', errorController.notFound404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem})


sequelize
//.sync({force: true})
.sync()
.then(result => {
  return User.findByPk(1);
  //console.log(result);
}).then(user => {
  if(!user) {
    return User.create({userName: 'Maria', email: 'test@test.com'})
  }
  return user
}).then(user => {
  return user.createCart();
}).then(cart => {
  app.listen(PORT)
})
.catch(err => console.log(err));
