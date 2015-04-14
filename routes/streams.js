var express = require('express');
var router = express.Router();
var Twit = require('twit');
var config = require('../config');

var twitter = new Twit(config.twitter);

var TWEET_COUNT = 10;
var MAX_WIDTH = 305;
var OEMBED_URL = 'statuses/oembed';

router.get('/', function(req, res) {

	var oEmbedTweets = [], tweets = [],

	params = {
		q : "periscope.tv",
		result_type : "recent",
		count : TWEET_COUNT
	};

	twitter.get('search/tweets', params, function(err, data, resp) {

		if (data) {
			tweets = data.statuses;
		}

		var i = 0, len = tweets.length;

		for (i; i < len; i++) {
			getOEmbed(tweets[i]);
		}

	});

	function getOEmbed(tweet) {

		var params = {
			"id" : tweet.id_str,
			"maxwidth" : MAX_WIDTH,
			"hide_thread" : true,
			"omit_script" : true
		};

		twitter.get(OEMBED_URL, params, function(err, data, resp) {
			tweet.oEmbed = data;
			oEmbedTweets.push(tweet);

			if (oEmbedTweets.length == tweets.length) {
				res.setHeader('Content-Type', 'application/json');
				res.send(oEmbedTweets);

			}
		});
	}
});

module.exports = router;
