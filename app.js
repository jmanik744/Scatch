const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const db = require('./config/mongoose-connection')
const indexRouter = require("./routes/index")
const ownersRouter = require("./routes/ownersRouter")
const productsRouter = require("./routes/productsRouter")
const usersRouter = require("./routes/usersRouter")
const flash = require("connect-flash")
const expressSession = require("express-session")
const app = express()

require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")
app.use('/',indexRouter)
app.use('/users',usersRouter)
app.use('/owners',ownersRouter)
app.use('/products',productsRouter)
app.use(
    expressSession({
        resave:false,
        saveUninitialized:true,
        secret: 'secret'
    })
)
app.use(flash())
app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.listen(3000)
