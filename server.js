const express = require('express');
const app = express();
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// mongoDB connect
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.urfd2va.mongodb.net/?retryWrites=true&w=majority', (error, client) => {
    app.listen(8080, function() {
        console.log('listening on 8080');
    });
});


// app.get('경로', function(요청, 응답) {});
app.get('/pet', function(req, res) {
    res.send('펫 용품 쇼핑 페이지입니다.');
});

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html')
});

app.get('/write', (req, res)  => {
    res.sendfile(__dirname + '/write.html')
});

app.post('/add', (req, res) => {
    res.send('전송완료');
    console.log(req.body);
    console.log(req.body.title);
});