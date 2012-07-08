var crawler = require('../main').core,
    fs = require('fs');

crawler.page({
    url: 'www.globalcode.com.br'    
}, function ( content ) {
    fs.writeFileSync('format-index-google.json',
        JSON.stringify(
            crawler.extract({
                target: content    
            })
        ),
        'utf-8'
    );    
});
