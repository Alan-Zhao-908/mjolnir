var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan')
const cors = require('cors')
var app = express();

//Middleware
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// logging
app.use(morgan('dev'));

app.post('/comments', function(req, res) {

  //save movie as favorite

});

app.post('/postComment', function(req, res) {

  //remove movie from favorites

});


app.listen(3002, function() {
  console.log('listening on port 3002!');
});
