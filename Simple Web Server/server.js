var http = require("http");
var fs = require("fs");

http.createServer(function(req, res){
    var kode = 0;
    var file = "";

    if(req.url == "/"){
        kode = 200;
        file = "index.html"
    } else if(req.url == "/contact"){
        kode = 200;
        file = "contact.html"
    } else {
        kode = 404;
        file = "404.html";
    }

    res.writeHead(kode,{"Content-Type" : "text/html"});
    fs.createReadStream('./'+file).pipe(res);
}).listen(3000);

console.log("Server is running!");