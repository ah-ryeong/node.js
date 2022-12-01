const express = require('express');
const app = express();

app.listen(8080, function() {
    console.log('listening on 8080');
});

// app.get('경로', function(요청, 응답) {});
app.get('/pet', function(req, res) {
    res.send('펫 용품 쇼핑 페이지입니다.');
});