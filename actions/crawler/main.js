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

        extract: function ( settings ) {
           var output = {};
               settings = settings || {};

           if ( settings ) {
               var target = settings['target'],
                   extraction = {
                       metas: {
                           author: target.find('meta[name=author]').attr('content'),
                           description: target.find('meta[name=description]').attr('content'),
                           keywords: target.find('meta[name=keywords]').attr('content'),
                       },

                       title: target.find('head title').text(),
                       anchors: target.find('a'),
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
                   output = extraction;    
               }
           }

           return output;
        },

        core: core,
    };  

    return new core;
} ());

exports.core = Crawler;
