const express = require('express')
const app = express()
const port = 8000


//use express router
app.use('/',require('./routes/index'))


app.listen(port,function(err){
    if(err){
        console.log(`Error in porting:${err}`);
        return
    }
    console.log(`Server running successfully on port:${port}`);

})