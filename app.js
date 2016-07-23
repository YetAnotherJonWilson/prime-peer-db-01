var mongoose = require('mongoose');
var express = require('express');
var assignmentRouter = require('./routes/assignment');
var index = require('./routes/index');
var bodyParser = require('body-parser');

var app = express();

var mongoURI = "mongodb://localhost:27017/assignments";
var MongoDB = mongoose.connect(mongoURI).connection;

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', index);
//app.use('/ass', assignmentRouter);

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Address', server.address());
  console.log('Listening on port', port);
})
