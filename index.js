var express = require('express');
var bodyParser = require('body-parser');
//var multer = require('multer');
//var cookieParser = require('cookie-parser');
//var upload = multer();

var app = express();

//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(upload.array());

//Require the Router we defined in movies.js
var merchants = require('./merchants.js');
var auth = require('./auth.js');
//Use the Router on the sub route /movies
app.use('/merchants', merchants);
app.use('/auth', auth);

app.listen(3000, () => console.log('Listening on port 3000'));