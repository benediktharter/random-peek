var app = angular.module('Twitter', [ 'ngResource', 'ngSanitize' ]);

app.controller('StreamList', function($scope, $resource, $timeout) {

	function init() {

		$scope.loaded = true;

		$scope.streamsResult = [];

		$scope.msnry = new Masonry('#stream-list', {
			columnWidth : 320,
			itemSelector : '.stream-item',
			transitionDuration : 0,
			isFitWidth : true
		});

		twttr.events.bind('loaded', function() {
			console.log("loaded");
			$scope.msnry.reloadItems();
			$scope.msnry.layout();
		});

		$scope.getStreams();
	}

	function getStreams() {

		$scope.loaded = true;

		$scope.tweets = $resource('/streams', null);

		$scope.tweets.query({}, function(res) {
			$scope.streamsResult = res;

			$timeout(function() {
				console.log("loading");
				twttr.widgets.load();
			}, 10);

			$scope.loaded = true;

		});
	}

	$scope.getStreams = function() {
		$scope.maxId = undefined;
		getStreams();
	}

	init();
});