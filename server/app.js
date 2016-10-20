/**
 * @file express server
 * @author Sameen
 * @date 2016-10-14
 */

var express = require('express');
var app = express();

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    if (req.method === 'OPTIONS') {
        res.send(200); // 让options请求快速返回
    }
    else  {
        next();
    }
});

app.get('/api/default', function (req, res) {
    res.sendfile('./mock/default.json');
});

app.get('/api/search', function (req, res) {
    res.sendfile('./mock/search.json');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});
