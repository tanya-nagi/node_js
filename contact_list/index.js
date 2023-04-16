const express = require('express')
const path = require('path')
const port = 8000

const db = require('./config/mongoose')
const Contact = require('./models/contact')

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

    Contact.find().then(function(contact){
        return res.render('home',{
            title:'my contact list', 
            contact_list:contact
        })
    }).catch((err)=>console.log(err,'Error in fetching the data'))

    // return res.render('home',{
    //     title:'my contact list', 
    //     contact_list:contactList
    // })
})


app.get('/practice',function(req,res){
    return res.render('practice',{
        title: 'let play',
    })
})

app.post('/create-contact',function(req,res){
    Contact.create({ name: req.body.name,
        phone: req.body.phone })
    .then(result => {
        console.log(result)
        res.redirect('/')
    })
})


app.listen(port,function(err,data){
    if(err){
        console.log(err)
    }

    console.log('express is running',port)
})

app.get('/delete-contact/', function(req, res){
    //get the id from query parameter in url
    let id = req.query.id
    //finding the data  using id in db
    Contact.findByIdAndDelete(id).then(function(){
        return res.redirect('back'); 
    }).catch((err)=>console.log("error in deleting",err))




    // console.log(req.query);
    // let phone = req.query.phone

    // let contactindex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactindex != -1){
    //     contactList.splice(contactindex, 1);
    // }

    // return res.redirect('back');
});


//mongodb
