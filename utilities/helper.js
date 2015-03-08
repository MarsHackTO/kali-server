'use strict';

var _ = require('lodash');

exports.capitalize = function(text) {
    var words = text.split(' ');

    _.forEach(words, function(word, index) {
        words[index] = word[0].toUpperCase() + word.substring(1).toLowerCase();
    });

    return words.join(' ');
};