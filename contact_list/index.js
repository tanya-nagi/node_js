const express = require('express')
const path = require('path')
const port = 8000

const app = express();

//setting the property as ejs
app.set('view engine','ejs')

app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended: true}))

// //middleware creation
// app.use(function(req,res,next){
//     console.log('middleware 1 called');
//     next()
// })

//accessing static files
app.use(express.static('assets'))

var contactList = [
    {
        name:'tanya',
        phone:'9876543210'
    },
    {
        name:'abc',
        phone:'1234567890'
    }
]

app.get('/',function(req,res){
    //send the data to the server whatever we need to display in the server
    // res.send('Cool , we are in the server')

    return res.render('home',{
        title:'my contact list', 
        contact_list:contactList
    })
})


app.get('/practice',function(req,res){

    return res.render('practice',{
        title: 'let play',
    })
})

app.post('/create-contact',function(req,res){
    // return res.redirect('/practice')
    console.log(req.body)
})


app.listen(port,function(err,data){
    if(err){
        console.log(err)
    }

    console.log('express is running',port)
})