var http = require("http");
var fs = require("fs");
var url = require("url");

http.createServer(function(req, res){
    if (req.url != "/favicon.ico") {
        var access = url.parse(req.url);
        var file = "";
        if (access.pathname == "/") {
            file = "./index.html";
        } else if (access.pathname == "/contact") {
            file = "./contact.html"
        } else {
            file = "./404.html";
        }
        res.writeHead(200,{"Content-Type" : "text/html"});
        // membaca file pada halaman conten
        fs.createReadStream(file).pipe(res);
    }
    
}).listen(8888);

console.log("Server is running!");