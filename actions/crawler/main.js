#!/usr/bin/env node

var Crawler = (function () {
    // Web crawler
    var core = function () {},
        http = require('http'),
        https = require('https'),
        jquery = require('jquery'),
        _ = require('underscore');

    core.prototype = {
        page: function ( settings, callback ) {
            var callback = callback || function () {},
                connection = http,
                options = {
                    host: settings['url'],
                    port: settings['port'] || 80,
                    agent: settings['agent'] || ( false ),
                    https: settings['https'] || ( false ),
                };

            if ( settings && callback ) {
                if ( options['https'] ) {
                    options = {
                        host: options['host'],
                        path: settings['path'] || '/'
                    };    

                    connection = https;
                }

                connection.get( options, function ( response ) {
                    response.on('data', function ( chunk ) {
                        return callback(
                            jquery('html').html( chunk.toString('utf-8') )
                        );    
                    });    
                });
            }
        },

        extract: function ( settings ) {
           var output = {};
               settings = settings || {};

           if ( settings ) {
               var target = settings['target'],
                   mode = settings['mode'],
                   extraction = {
                       metas: {
                           // Get meta content of name author
                           author: target.find('meta[name=author]').attr('content'),
                           // Get content of description name
                           description: target.find('meta[name=description]').attr('content'),
                           // Get content of keywords name
                           keywords: target.find('meta[name=keywords]').attr('content'),
                       },
                       // Get title of page
                       title: target.find('head title').text(),
                       // Get anchors of page
                       anchors: target.find('a'),
                       // Get images of page
                       images: target.find('img'),
                   };

               // Extract href of anchors
               extraction.anchors = (function () {
                   var anchors = extraction.anchors,
                       len = anchors.length,
                       counter = 0,
                       output = [];
                   
                   while ( counter < len ) {
                       if ( anchors.eq('href') !== '' ) {
                          output.push( anchors.eq( counter ).attr('href') );    
                       }

                       counter += 1;
                   }

                   return _.compact( _.uniq( output ) );
               } ()); 

               // Extract src of images
               extraction.images = (function () {
                   var images = extraction.images,
                       len = images.length,
                       counter = 0,
                       output = [];

                   while ( counter < len ) {
                       if ( images.eq( counter ).attr('src') !== '' ) {
                           output.push( images.eq( counter ).attr('src') );
                       }    

                       counter += 1;
                   }

                   return _.compact( _.uniq( output ) );
               } ());

               if ( extraction ) {
                   if ( mode ) {
                       output = extraction[ mode ];
                   } if ( !mode ) {
                       output = extraction;    
                   }
               }
           }

           return output;
        },

        core: core,
    };  

    return new core;
} ());

exports.core = Crawler;
