const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/codeial_minor').then(()=>console.log('Running Successfully with db')).catch((error)=>console.log(error))