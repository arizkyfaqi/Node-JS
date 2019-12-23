var http = require('http');
var url = require('url');
var routes = require('routes')();
/* 
    before using swig
    frist install swig in terminal > npm install swig 
*/
var view = require('swig');

routes.addRoute('/', function(req, res){
    var html = view.compileFile('./index.html')();
    res.writeHead(200, {"Conten-Type" : "text/plain"});
    res.end(html);
});

routes.addRoute('/contact', function(req, res){
    var html = view.compileFile('./contact.html')();
    res.writeHead(200, {"Conten-Type" : "text/plain"});
    res.end(html);
});

routes.addRoute('/form', function(req, res){
    var html = view.compileFile('./form.html')();
    res.writeHead(200, {"Conten-Type" : "text/plain"});
    res.end(html);
});

http.createServer(function(req, res){
    var path = url.parse(req.url).pathname;
    var match = routes.match(path);

    if (match) {
        match.fn(req, res);
    } else {
        res.writeHead(404, {"Conten-Type" : "text/plain"});
        var html = view.compileFile('./404.html')();
        res.end(html);
    }
}).listen(3000);

console.log("Server is Running!");