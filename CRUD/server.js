/*
    Create Read Update Delete
*/
var http = require('http');
var url = require('url');
var qString = require('querystring')
var routes = require('routes')();
var view = require('swig');
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

    // query untuk select tabel
    conn.query("select * from mahasiswa", function(err, rows, field){
        if (err) throw err;
        
        var html = view.compileFile('./index.html')({
            title : "Data Mahasiswa",
            data : rows
        });
    
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end(html);
    });
});

routes.addRoute('/insert', function(req, res){
    
    if (req.method.toUpperCase() == "POST") {
        var data_post = "";
        req.on('data', function(chucks){
            data_post += chucks;
        });

        req.on('end', function(){
            data_post = qString.parse(data_post);
            //query untuk insert data
            conn.query("insert into mahasiswa set ? ",data_post, 
            function(err, field){
                if(err) throw err;
                
                res.writeHead(302, {"Location" : "/"});
                res.end();
            });

        });
    } else {
        var html = view.compileFile('./form.html')();
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end(html);
    }
});

routes.addRoute('/update/:id', function(req, res){

    conn.query("select * from mahasiswa where ?",
    { no_induk : this.params.id },
        function(err, rows, field) {
            if (rows.length){
                var data = rows[0];
                if (req.method.toUpperCase() == "POST") {
                    var data_post = "";
                    req.on('data', function(chucks){
                        data_post += chucks;
                    });

                    req.on('end', function(){
                        data_post = qString.parse(data_post);
                            //query delete update
                            conn.query("update mahasiswa set ? where ?", [
                                data_post,
                                {no_induk : data.no_induk}
                            ], function(err, fields){
                                if(err) throw err;

                                res.writeHead(302, {"Location" : "/"});
                                res.end();
                            });
                        
                            
                    });
                } else {
                    var html = view.compileFile('./form_update.html')({
                        data : data
                    });
                    res.writeHead(200, {"Content-Type" : "text/html"});
                    res.end(html); 
                }

            } else {
                var html = view.compileFile('./404.html')();
                res.writeHead(404, {"Content-Type" : "text/html"});
                res.end(html);
            }

        }
    );
    
    
});

routes.addRoute('/delete/:id', function(req, res){

    // query delete
    conn.query("delete from mahasiswa where ? ", 
    {no_induk : this.params.id },
    function(err, field){
        if (err) throw err;
        res.writeHead(302, {"Location" : "/"});
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

