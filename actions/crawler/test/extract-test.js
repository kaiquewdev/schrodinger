var crawler = require('../main').core,
    fs = require('fs');

crawler.page({
    url: 'kaiquewdev.nodester.com'    
}, function ( content ) {
    fs.writeFileSync('format-index.json',
        JSON.stringify(
            crawler.extract({
                target: content    
            })
        ),
        'utf-8'
    );    
});
