var Benchmark = require('benchmark'),
    crawler = require('../main').core;

var results = new Benchmark.Suite('Crawler page', {
    'onstart': crawler.page({
        url: 'kaiquewdev.nodester.com'
    }, function ( content ) {
        return content;
    })
});

results.run({
    async: true,
    queued: true
});
