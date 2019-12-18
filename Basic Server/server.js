//include modul http
var http = require('http');

//create server function(request, response)
http.createServer(function(req, res){

    if(req.url != "/favicon.ico"){
        console.log(req.url);

        //write head
        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.write("Hello World! from Node JS server\n");
        res.write("Your Request file : "+req.url);
    
        //response end
        res.end();
    }

//di jalan kan pada port 8888    
}).listen(8888);


console.log("Server is running!");