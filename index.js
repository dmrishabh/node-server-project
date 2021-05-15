const http = require('http');
const fs = require('fs');
const path = require('path');

const hostName = "localhost";

const port = 3000;

const server = http.createServer((request, responce) => {

    // console.log(request.headers);
    console.log('request for' + request.url + 'by methode' + request.method);

    if (request.method == 'GET') {

        var fileUrl;
        if (request.url == '/') {
            fileUrl = "/index.html"
        } else { fileUrl = request.url }

        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);

        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    responce.statusCode = 404;
                    responce.setHeader('Content-Type', 'text/html');
                    responce.end(
                        ' <html> <head> <title>Error page</title> </head> <body> <h2>This site can not  be reached.</h2> <h3>ERROR 404: '+fileUrl+' Does not exist. </h3>  </body></html>');
                }
                else {

                    responce.statusCode = 200;
                    responce.setHeader('Content-Type', 'text/html');
                    fs.createReadStream(filePath).pipe(responce);

                }


            })
        } else { 
            responce.statusCode = 404;
            responce.setHeader('Content-Type', 'text/html');
            responce.end(
                ' <html> <head> <title>Error page</title> </head> <body>  This site can not be reached. <h3>ERROR 404: '+fileUrl+' Not a html file... </h3>  </body></html>');
        }

    } else {
        responce.statusCode = 404;
        responce.setHeader('Content-Type', 'text/html');
        responce.end(
            ' <html> <head> <title>Error page</title> </head> <body> This site can not be reached. <h3>ERROR 404: '+fileUrl+' Not supported </h3>  </body></html>');

    }




    // responce.statusCode = 200;
    // responce.setHeader('Content-Type', 'text/html');
    // responce.end(
    // ' <html> <head> <title>Our first HTML page</title> <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"> </head> <body> <h2>Welcome to the web site: this is a heading inside of the heading tags.</h2> <p>This is a paragraph of text inside the paragraph HTML tags. We can just keep writting ... </p> <h3>Now we have an image:</h3>  </body></html>')
});

server.listen(port, hostName, () => { console.log(`SERVER RUNNING AT http://${hostName}:${port}`); });
