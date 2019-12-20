var http = require("http");
var fs = require("fs");
//include fungsi-fungsi yang ada pada module url
var url = require("url");
//include fungsi-fungsi yang ada pada module querystring
var qString = require("querystring");

//Create web server
http.createServer(function(req, res){
    if (req.url != "/favicon.ico") {

        //parse url : memecah url menjadi beberapa bagian object
        //dan mengambil object queryString
        //req.url : mengambil request url dari clien
        var access = url.parse(req.url);

        //jika object pada pathname adalah / (index)
        if (access.pathname == "/") {
            
            //parse query : memecah querystring menjadi beberapa bagian object(JSON)
            var data = qString.parse(access.query);
            //write head web browser, 200 artinya ok, content-type : text/plain adlh isi konten nya
            res.writeHead(200, {"Content-Type" : "text/plain"});
            //untuk menampilkan di web browser object JSON harus di rubah menjadi data string
            res.end(JSON.stringify(data));

        //jika pathname /form
        } else if (access.pathname == "/form") {

            // request(meminta) method pada form dan merubah menjadi huruf kapital
            //jika method == POST
            if (req.method.toUpperCase() == "POST") {
                
                //untuk menampung data post
                var data_post = "";
                
                //ketika request data nya ada, ambil 'data'
                //function callback(chunck), parameter chunck untuk menampung data yng telah di ambil
                req.on('data', function(chunck){

                    //data_post menyimpan data chunck ()
                    data_post += chunck;
                });

                //ketika request nya selesai(end)
                req.on('end', function(){
                    data_post = qString.parse(data_post);
                    res.writeHead(200, {"Content-Type" : "text/plain"});
                    //tampilkan data_post
                    res.end(JSON.stringify(data_post));
                });

            } else {
                res.writeHead(200, {"Content-Type" : "text/html"});
                fs.createReadStream("./form.html").pipe(res);
            }
            
        } else {
            res.writeHead(404, {"Content-Type" : "text/plain"});
            res.end("Page not Found!");
        }

    }
    
}).listen(3000);

console.log("Server is running!");