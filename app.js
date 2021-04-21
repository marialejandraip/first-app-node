const path = require('path');
const express = require('express');

const PORT = 3000;
const routerAdmin = require('./routes/admin');
const routerShop = require('./routes/shop')
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').connectMongodb;
const User = require('./models/user');

const app = express();

/* EJS */
app.set('view engine', 'ejs');
app.set('views', 'views')

//Parse the incoming request body first of all
app.use(express.urlencoded({extended:false}));
//Para leer documentos estaticos en directorio publico(donde estan los estilos)
app.use(express.static(path.join(__dirname,'public')));


app.use((req, res, next) => {
  User.findById('607f642d6aeb7717ddc0d3d0').then(user => {
    //user the only one 
    //req.user = user;
    req.user = new User(user.name, user.email, user.cart, user._id)
    next();
  })
  .catch(err => console.log(err))
})

app.use('/admin',routerAdmin.router);
app.use(routerShop);

app.use('/', errorController.notFound404);


mongoConnect(() => {
  app.listen(PORT)
})
