#!/usr/bin/env node

var Crawler = (function () {
    // Web crawler
    var core = function () {},
        http = require('http'),
        jquery = require('jquery'),
        _ = require('underscore');

    core.prototype = {
        page: function ( settings, callback ) {
            var callback = callback || function () {},
                options = {
                    host: settings['url'],
                    port: settings['port'] || 80,
                    agent: settings['agent'] || ( false ),
                };
            
            if ( settings && callback ) {
                http.get( options, function ( response ) {
                    response.on('data', function ( chunk ) {
                        return callback( 
                            jquery('html').html( chunk.toString('utf-8') ) 
                        );    
                    });    
                });
            }
        },
    };  

    return new core;
} ());

exports.core = Crawler;
