/*
    Tutorial koneksi node JS dengan Database mysql
*/
var http = require('http');
var url = require('url');
var routes = require('routes')();
//include modul mysql
var mysql = require('mysql');

//membuat koneksi database mysql.sreateConnection
var conn = mysql.createConnection({
    host : "localhost",
    port : 3306,
    database : "nodejs",
    user : "root",
    password : ""
});

//add routes
routes.addRoute('/', function(req, res){

    //query untuk select tabel
    conn.query("select * from mahasiswa", function(err, rows, field){
        if (err) throw err;
        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.end(JSON.stringify(rows));
    });
});

routes.addRoute('/insert', function(req, res){

    //query untuk insert data
    conn.query("insert into mahasiswa set ? ",{
        no_induk :  "11223307",
        nama : "Madani",
        alamat : "Aceh"
    }, function(err, field){
        if(err) throw err;
        
        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.end(field.affectedRows+" Affected Rows");

    });

});

routes.addRoute('/update', function(req, res){

    //query delete update
    conn.query("update mahasiswa set ? where ?", [
        {nama : "Bayu Skak"},
        {no_induk : "11223304"}
    ], function(err, fields){
        if(err) throw err;

        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.end(fields.affectedRows+" Rows Updated");
    });
    
});

routes.addRoute('/delete', function(req, res){

    // query delete
    conn.query("delete from mahasiswa where ? ", 
    {no_induk : "11223303"},
    function(err, field){
        if (err) throw err;
        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.end(field.affectedRows+ " Rows Deleted");    
    });
});


//creat server
http.createServer(function(req, res){
    
    var path = url.parse(req.url).pathname;
    var match = routes.match(path);

    if (match) {
        match.fn(req, res);
    } else {
        res.writeHead(404, {"Content-Type" : "text/plain"});
        res.end("Page Not Found!");
    }

}).listen(3000);

console.log("Server is Running!");

