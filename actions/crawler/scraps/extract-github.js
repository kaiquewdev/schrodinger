var crawler = require('../main').core,
    fs = require('fs');

crawler.page({
    url: 'github.com',
    https: true,
}, function ( content ) {
    console.log(
        crawler.extract({
            target: content    
        })
    );
});
