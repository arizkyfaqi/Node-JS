var http = require("http");
var fs = require("fs");
var url = require("url");

http.createServer(function(req, res){
    var access = url.parse(req.url);
    console.log(access);
    res.writeHead(200,{"Content-Type" : "text/plain"});
    res.end("Hello World");
}).listen(3000);

console.log("Server is running!");