'use strict';

var Account = require(__dirname + '/account.model');
var async = require('async');
var config = require('config');
var request = require('request');

exports.updateProfile = function (req, res) {
    async.waterfall([
        findDocument,
        updateDocument
    ], finalCallback);

    function findDocument(waterfallNext) {
        Account
            .find()
            .exec(function (error, accounts) {
                var result = accounts.length ? accounts[0] : new Account();
                waterfallNext(error, result);
            });
    }

    function updateDocument(account, waterfallNext) {
        account.phoneNumber = req.body.phoneNumber;
        account.save(function (error) {
            waterfallNext(error);
        });
    }

    function finalCallback(error) {
        if (error) {
            return res
                .status(400)
                .send();
        }

        res
            .status(200)
            .send();
    }
};

exports.makePhoneCall = function (req, res) {
    async.waterfall([
        findDocument,
        callTwilio
    ], finalCallback);

    function findDocument(waterfallNext) {
        Account
            .find()
            .exec(function (error, accounts) {
                var result = !accounts.length ? new Account() : accounts[0];
                waterfallNext(error, result);
            });
    }

    function callTwilio(account, waterfallNext) {
        var options = {
            url: 'https://' + config.TWILIO.SSID + ':' + config.TWILIO.AUTH_TOKEN + '@api.twilio.com/2010-04-01/Accounts/' + config.TWILIO.SSID + '/Calls',
            method: 'POST',
            formData: {
                'To': account.phoneNumber,
                'From': config.TWILIO.FROM_PHONE_NUMBER,
                'Url': config.TWILIO.URL
            },
            json: true
        };

        request(options, function (error, response, body) {
            waterfallNext(error);
        });
    }

    function finalCallback(error) {
        if (error) {
            return res
                .status(400)
                .send();
        }

        res
            .status(200)
            .send();
    }
};
