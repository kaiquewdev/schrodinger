var http = require('http');

var options = {
    host: 'www.google.com.br',
    port: 80,
    path: '/',
    agent: false
};

http.get(options, function ( res ) {
    res.on('data', function ( chunk ) {
        console.log( chunk.toString('utf-8') );    
    });
}).on('error', function ( e ) {
    console.log( e.message );
});
