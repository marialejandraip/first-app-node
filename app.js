const path = require('path');
const express = require('express');
//const sequelize = require('./util/database');

const PORT = 3000;
const routerAdmin = require('./routes/admin');
const routerShop = require('./routes/shop')
// const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').connectMongodb;

const app = express();

/* EJS */
app.set('view engine', 'ejs');
app.set('views', 'views')

//Parse the incoming request body first of all
app.use(express.urlencoded({extended:false}));
//Para leer documentos estaticos en directorio publico(donde estan los estilos)
app.use(express.static(path.join(__dirname,'public')));


// app.use((req, res, next) => {
//   User.findByPk(1).then(user => {
//     req.user = user;
//     next();
//   })
//   .catch(err => console.log(err))
// })

app.use('/admin',routerAdmin.router);
app.use(routerShop);

//app.use('/', errorController.notFound404);

// sequelize
// //.sync({force: true})
// .sync()
// .then(result => {
//   return User.findByPk(1);
//   //console.log(result);
// }).then(user => {
//   if(!user) {
//     return User.create({userName: 'Maria', email: 'test@test.com'})
//   }
//   return user
// }).then(user => {
//   return user.createCart();
// }).then(cart => {
//   app.listen(PORT)
// })
// .catch(err => console.log(err));

mongoConnect(() => {
  
  app.listen(PORT)
}
)