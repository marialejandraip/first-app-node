//onst http = require('http'); //import file with path or module like this
const path = require('path');
const express = require('express');
const sequelize = require('./util/database');
const PORT = 3000;

const routerAdmin = require('./routes/admin');
const routerShop = require('./routes/shop')
const errorController = require('./controllers/error');

const app = express();

/* EJS */
app.set('view engine', 'ejs');
app.set('views', 'views')

//Parse the incoming request body first of all
app.use(express.urlencoded({extended:false}));
//Para leer documentos estaticos en directorio publico(donde estan los estilos)
app.use(express.static(path.join(__dirname,'public')));

app.use(routerShop);
app.use('/admin',routerAdmin.router);

app.use('/', errorController.notFound404);

sequelize.sync().then(result => {
  //console.log(result);
  app.listen(PORT)
}).catch(err => console.log(err));
