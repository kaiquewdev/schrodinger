var Benchmark = require('benchmark'),
    crawler = require('../main').core;

var suite = new Benchmark.Suite;

suite.add('Crawler the page', function () {
    crawler.page({
        url: 'kaiquewdev.nodester.com'
    }, function ( content ) {
        crawler.extract({
            target: content 
        });
    });    
}).run();
