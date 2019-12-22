/*
    untuk menggunakan modul rouring di node js
    perlu menginstall library routes
    terminal direktory project > npm install routes
*/
var http = require('http');
//require modul routes
var routes = require('routes')();
var url = require('url');
var qString = require("querystring");

//make a route
routes.addRoute('/', function(req, res){
    res.writeHead(200, {"Content-Type" : "text-plain"});
    res.end("Welcome To Home Page!");
});

//mengakses querystring 1
//:customer? artinya adalah var yg menampung querystring
// yg akan di tampilkan di this.params.customer
routes.addRoute('/Customer/:customer?', function(req, res){
    res.writeHead(200, {"Content-Type" : "text-plain"});
res.end("Welcome "+ this.params.customer +" To Customer Page!");
});

//mengakses querystring 2
routes.addRoute('/profile', function(req, res){
    //parse menjadi query string
    // var access = url.parse(req.url);
    //parse menjadi JSON
    var data = qString.parse(url.parse(req.url).query);

    res.writeHead(200, {"Content-Type" : "text-plain"});
    res.end("Welcome "+data.nama+" To Your Profile Page!");
});

http.createServer(function(req, res){
    
    //pull pathname from url
    var path = url.parse(req.url).pathname;
    // console.log(url.parse(req.url));
    //verification routes with path
    var match = routes.match(path);
    if (match){
        //if match then run the function(routes)
        match.fn(req, res, match);
    } else {
        res.writeHead(404, {"Content-Type" : "text-plain"});
        res.end("Page Not Found!");
    }

}).listen(3000);

console.log('Server is Running!');