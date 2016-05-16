/**
 * Created by hzy on 5/13/16.
 */
var request = require('supertest')
    , express = require('express');
var app = require('../app.js');

// app.get('/', function(req, res){
//     res.send(200, { name: 'tobi' });
// });
//
// request(app)
//     .get('/')
//     .expect('Content-Type', /json/)
//     .expect('Content-Length', '20')
//     .expect(200)
//     .end(function(err, res){
//         if (err) throw err;
//     });

var body = {
    tagName: 'a',
    points: [
        {
            name: 'billing',
            startTime: 2.0,
            endTime: 3.0,
        },
        {
            
            name: 'billing',
            startTime: 4.0,
            endTime: 5.0,
        },
        {
            
            name: 'billing',
            startTime: 7.0,
            endTime: 8.0,
        },
        {
            
            name: 'billing',
            startTime: 12.0,
            endTime: 16.0,
        },
        {
            
            name: 'billing',
            startTime: 17.0,
            endTime: 23.0,
        },
        {
            
            name: 'billing',
            startTime: 17.0,
            endTime: 23.0,
        },
        {
            
            name: 'tina',
            startTime: 2.0,
            endTime: 5.0,
        },
        {
            
            name: 'tina',
            startTime: 7.0,
            endTime: 9.0,
        },
        {
            name: 'tina',
            startTime: 13.0,
            endTime: 14.0,
        },
        {
            name: 'tina',
            startTime: 16.0,
            endTime: 19.0,
        },
    ]
};

request(app)
    .post('/')
    .send(body)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
        console.log(res);
    });


    request(app)
        .get('/')
        .set('Accept', 'application/html')
        .expect(200)
        .expect('Content-Type', 'application/html; charset=utf-8')
        .end(function(err, res) {
            console.log(res);
        });

    request(app)
        .get('/find')
        .query('tagName=a')
        // .set('Accept', 'application/json')
        // .expect(200)
        // .expect('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res) {
            console.log(res);
        });
// req.get('website.com')
//     .query({ q: 'help' })
//     .query({ q: 'moreHelp' })
//     .query({ q: 'evenMoreHelp' })
//     .end(...);