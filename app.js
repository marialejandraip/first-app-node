//onst http = require('http'); //import file with path or module like this
const path = require('path');
const express = require('express');
const db = require('./util/database');
const PORT = 3000;
const ejs = require('ejs');

const errorController = require('./controllers/error');

const app = express();

const routerAdmin = require('./routes/admin');
const routerShop = require('./routes/shop')

db.execute('SELECT * FROM products')
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  })
/* EJS */
app.set('view engine', 'ejs');

/* HBS */
//const handlebars = require('express-handlebars');
//{ layoutsDir:'views/layouts', defaultLayout:'main-layout'}
//app.engine('hbs', handlebars());
//app.set('view engine', 'hbs');
/* PUG */
//app.set('view engine', 'pug');
app.set('views', 'views')
/*---- lets create a middleware ----*/
// //w/o next() never will run the other midleware from top to bottom
//El orden importa un montón

// app.use((req, res, next)=>{
  //   console.log('my first midleware for real!👀');
  //   next(); // allows the request continue to the next midleware in line
  // })

//Parse the incoming request body first of all
app.use(express.urlencoded({extended:false}));
//Para leer documentos estaticos en directorio publico(donde estan los estilos)
app.use(express.static(path.join(__dirname,'public')));

app.use(routerShop);
app.use('/admin',routerAdmin.router);

app.use('/', errorController.notFound404);
  
// (req, res, next) => {
//   //res.status(404).sendFile(path.join(__dirname, 'views', 'not-found.html'));
//   res.status(404).render('not-found', {docTitle:"404 Page not found"})
// })
// const server = http.createServer(app);
// server.listen(PORT);

app.listen(PORT)
