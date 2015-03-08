var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('config');
var mongoose = require('mongoose');

var options = {
    server: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    }
};

mongoose.connect(config.DB_CONFIG, options);

app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));

var account = require(__dirname + '/account.controller');
app.post('/api/account/update-profile', account.updateProfile);
app.post('/api/account/make-phone-call', account.makePhoneCall);

app.listen(config.PORT);
console.log('Magic happens on port ' + config.PORT);


exports = module.exports = app;
