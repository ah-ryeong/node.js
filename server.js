const express = require('express');
const app = express();
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// mongoDB connect
const MongoClient = require('mongodb').MongoClient;

// ejs
app.set('view engine', 'ejs');

let db;

MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.urfd2va.mongodb.net/?retryWrites=true&w=majority', (error, client) => {
    if(error) return console.log(error);    

    db = client.db('todoapp');

    // db.collection('post').insertOne('저장할 데이터', (error, result) => {
    //     console.log('저장완료');
    // });

    app.listen(8080, function() {
        console.log('listening on 8080');
    });
});


// app.get('경로', function(요청, 응답) {});
app.get('/pet', function(req, res) {
    res.send('펫 용품 쇼핑 페이지입니다.');
});

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/write', (req, res)  => {
    res.sendfile(__dirname + '/write.html');
});

app.post('/add', (req, res) => {
    db.collection('counter').findOne({ name: '게시물갯수' }, (error, result) => {
        console.log(result.totalPost);
        const totalPost = result.totalPost;

        db.collection('post').insertOne({_id : totalPost + 1, title : req.body.title, date : req.body.date}, (error, result) => {
            console.log('저장완료');
            db.collection('counter').updateOne(
                { name: '게시물갯수' },
                { $inc : { totalpost : 1 }}, 
                (error, result) => {
                    if(error) return console.log(`/add counter update error ::: ${error}`);
                }
            );
        });
    });
    res.send('전송완료');
});

app.get('/list', (req, res)  => {
    db.collection('post').find().toArray((error, result) => {
        console.log(result);
        res.render('list.ejs', { posts : result });
    });
});

app.delete('/delete', (req, res) => {
    console.log(req.body);
    req.body._id = parseInt(req.body._id);
    db.collection('post').deleteOne(req.body, (error, result)=>{
        console.log('삭제완료');
    });
}); 