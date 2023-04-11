const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/contact_list')
//mongoose.connect('mongodb+srv://tanya:Tanya123@cluster0.euucjcy.mongodb.net/?retryWrites=true&w=majority')


//check if connection is successful
const db = mongoose.connection;

//error
db.on('error',console.error.bind('Error in db'))

//success
db.once('open',function (){
  console.log('DB running successfully')
})







