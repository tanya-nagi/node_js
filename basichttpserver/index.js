const http = require('http')
const port = 8000
const fs = require('fs')

//function for requesting things
function requestHandler(req,res){
    //requesting url whereever we want to navigate
    console.log(req.url)

    res.writeHead(200,{'content-type':'text/html'})
    // fs.readFile('./index.html',function(err,data){
    //     if(err){
    //         console.log(err,'error')
    //         return res.end('<h1>Error</h1>')
    //     }

    //     return res.end(data)
        

    // })
   
    //it will display the response
    // res.end('<h1>gotcha</h1>')


    let filePath;
    switch(req.url){
        case '/':
            filePath = './index.html'
            break
        case '/profile':
            filePath='./profile.html'
            break
        default:
        filePath='./404.html'
    }
    fs.readFile(filePath,function(err,data){
        if(err){
            console.log(err,'error');
            return res.end('<h1>error</h1>')
        }
        return res.end(data)
    })

}


//creating server 
const server = http.createServer(requestHandler);

//listen to the port about the server
server.listen(port,function(err){
    if(err){
        console.log(err)
        return;
    }

    console.log('Server is running on Port:',port)
})