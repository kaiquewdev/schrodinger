var crawler = require('../main').core,
    fs = require('fs');

crawler.page({
    url: 'github.com',
    https: true,
}, function ( content ) {
    var extraction = crawler.extract({
        target: content,
        mode: 'images'
    });

    console.log( extraction );
});
