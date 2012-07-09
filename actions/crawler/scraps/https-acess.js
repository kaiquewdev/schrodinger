var https = require('https');

https.get({
    host: 'github.com',
    path: '/'
}, function ( res ) {
    res.on('data', function ( d ) {
        console.log( d.toString('utf-8') );    
    });    

}).on('error', function ( c ) {
    console.log( c );
});
