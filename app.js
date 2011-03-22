/*
 * Post Commit Autotag
 *
 * Main app.js
 */

    var http = require('http'),
        sys = require('sys'),
        formidable = require('formidable');

    http.createServer(function(request,response){
        
        console.log(request.url);
        
        switch(request.url){
            case '/':
                response.statusCode = 200;
                response.end(
                    '<html>'+
                    '<head><title>Post Commit Autotag</title></head>'+
                    '<body><h1>Hello World - waiting for requests</h1></body>'+
                    '</html>'
                );
                break;
            case '/post-commit-callback':
                response.statusCode = 200;
                response.end('at post commit-callback');
                break;
        }
	
	}).listen(80, "50.22.221.90"); //end of createServer()