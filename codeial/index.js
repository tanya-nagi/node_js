const express = require('express')
const session = require('express-session')

const cookieParser = require('cookie-parser')
const app = express()
const port = 8000

const expressLayout = require('express-ejs-layouts')
const db = require('./config/mongoose')
const User = require('./models/user')

//used for session cookie and authenticate password
const passport = require('passport')
const passportLocal = require('./config/passport_local_stratergy')

//It will always defined on the top because it should work before view engine 
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(expressLayout)

//setting the styles and scripts from layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)


app.use(express.static('./assets'))

//set up view engine
app.set('view engine','ejs')
app.set('views','./views')


app.use(session({
    name:'codeial',
    //TODO Change the secret before the deployment in production mode
    secret: 'something',
    //want to know about this
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session())
//use express router
app.use('/',require('./routes'))
app.listen(port,function(err){
    if(err){
        console.log(`Error in porting:${err}`);
    }
    console.log(`Server running successfully on port:${port}`);

})