var express = require('express');
var app = express();
var bodyparser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
require('./routes')(app);


app.listen(PORT, function(){
  console.log('Express server up on Port ' + PORT);
});
