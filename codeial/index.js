const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const port = 8000

app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const expressLayout = require('express-ejs-layouts')
const db = require('./config/mongoose')
const User = require('./models/user')

//It will always defined on the top because it should work before view engine 
app.use(expressLayout)

//setting the styles and scripts from layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)


app.use(express.static('./assets'))

//use express router
app.use('/',require('./routes/index'))

//set up view engine
app.set('view engine','ejs')
app.set('views','./views')

app.listen(port,function(err){
    if(err){
        console.log(`Error in porting:${err}`);
    }
    console.log(`Server running successfully on port:${port}`);

})