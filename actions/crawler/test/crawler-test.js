var vows = require('vows'),
    assert = require('assert'),
    crawler = require('../main').core,
    fs = require('fs');

vows.describe('Web Crawler').addBatch({
    'Crawler page': {
        topic: '',
        'response content': function ( topic ) {
            crawler.page({url: 'kaiquewdev.nodester.com'}, function ( content ) {
                assert.equal( content && true, true, 'No content load' );
            });
        }
    },
    
    'Number of links in the page': {
        topic: '',
        'anchors number in the kaiquewdev': function ( topic ) {
            crawler.page({url: 'kaiquewdev.nodester.com'}, function ( content ) {
                assert.equal( content.find('body a').length === 10, true, '10 anchors in the home page' );
            });
            
        },
    },

    'Extraction key information': {
        topic: JSON.parse(
            fs.readFileSync('./format-index.json', 'utf-8')
        ),

        'meta, title, a, img': function ( topic ) {
            crawler.page({
                url: 'kaiquewdev.nodester.com'    
            }, function ( content ) {
                assert.deepEqual( crawler.extract({
                    target: content
                }), topic, 'Format index incorrect' );
            });
        },
    },
}).run();
