const express = require('express');
const path = require('path')
const app = express();
const port = 3030;

app.use(express.static('public'));

app.set(path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');



/*rutas dinamicas */
const indexRouter  = require('./routes/index');


app.get('/', indexRouter);










/*rutas */
/* app.get('/', (req,res) => {
    return res.sendFile(path.resolve(__dirname,'views','index.html'))
}); */
app.get('/register', (req,res) => {
    return res.sendFile(path.resolve(__dirname, 'views', 'register.html'))
});
app.get('/login', (req,res) => {
    return res.sendFile(path.resolve(__dirname, 'views', 'login.html'))
});

app.get('/product', (req,res) => {
    return res.sendFile(path.resolve(__dirname, 'views', 'productAll.html'))
});

app.get('/productCard', (req,res) => {
    return res.sendFile(path.resolve(__dirname, 'views', 'productCard.html'))
});

app.get('/carrito', (req,res) => {
    return res.sendFile(path.resolve(__dirname, 'views', 'productCart.html'))
});

app.listen(port, () => console.log(`Server running in port http://localhost:${port}`));