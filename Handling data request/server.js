var http = require("http");
var fs = require("fs");
//include fungsi-fungsi yang ada pada module url
var url = require("url");
//include fungsi-fungsi yang ada pada module querystring
var qString = require("querystring");

http.createServer(function(req, res){
    if (req.url != "/favicon.ico") {

        //parse url : memecah url menjadi beberapa bagian object
        //dan mengambil object queryString
        //req.url : mengambil request url dari clien
        var access = url.parse(req.url);
        if (access.pathname == "/") {
            
            //parse query : memecah querystring menjadi beberapa bagian object(JSON)
            var data = qString.parse(access.query);
            res.writeHead(200, {"Content-Type" : "text/plain"});
            res.end(JSON.stringify(data));
        } else if (access.pathname == "/form") {
            res.writeHead(200, {"Content-Type" : "text/html"});
            fs.createReadStream("./form.html").pipe(res);
        } else {
            res.writeHead(404, {"Content-Type" : "text/plain"});
            res.end("Page not Found!");
        }

    }
    
}).listen(3000);

console.log("Server is running!");