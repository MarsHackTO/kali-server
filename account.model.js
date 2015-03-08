'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');

var account = {
    makeCall: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String
    }
};

module.exports = mongoose.model('Account', account);
