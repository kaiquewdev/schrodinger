var crawler = require('../main').core,
    fs = require('fs');

crawler.page({
    url: 'www.wikipedia.org',
    path: 'wiki/São_Paulo_(cidade)'
}, function ( content ) {
    console.log(
        crawler.extract({
            target: content    
        })
    );
});
