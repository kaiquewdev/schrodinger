var Benchmark = require('benchmark'),
    suite = Benchmark.Suite,
    crawler = require('./main').core;

var results = new suite('Crawler page', {
    'onstart': crawler.page({
        url: 'kaiquewdev.nodester.com'
    }, function ( content ) {
        return content;
    })
});

console.log( results );
