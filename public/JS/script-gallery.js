var app = angular.module('app', ['ngAnimate'])

app.controller('mainCtrl', function ($scope) {
	$scope.boxes = [{
		name: 'RESIDENTIAL',
		image: 'Images/slide1.jpg'
	}, {
		name: 'THE WOONDER VUR',
		image: 'Images/3-1920x670.jpg'
	}, {
		name: 'Explore',
		image: 'Images/1-1170x572-card.jpg'
	}, {
		name: 'Vast',
		image: 'Images/slide2.jpg'
	}, {
		name: 'SUMMER HOUSE',
		image: 'Images/s7.jpg'
	}, {
		name: 'THE WOONDER VUR',
		image: 'Images/s6.jpg'
	}, {
		name: 'THE WOONDER VUR',
		image: 'Images/s8.jpg'
	}, {
		name: 'Sea',
		image: 'Images/s6.jpg'
	}, {
		name: 'Reach',
		image: 'Images/s9.jpg'
	}];

	$scope.selected = [];
	$scope.selectBox = function (item, position) {
		$scope.selected = [{
			item: item,
			position: position
		}];
		$scope.$apply();
	}
	$scope.clearSelection = function () {
		$scope.selected = [];
	}
})

app.directive('box', function () {
	return {
		restrict: 'E',
		scope: {},
		bindToController: {
			onSelect: "=",
			item: "="
		},
		controllerAs: 'box',
		controller: function () {
			var box = this;

			box.goFullscreen = function (e) {
				box.onSelect(box.item, e.target.getBoundingClientRect())
			}
		},
		link: function (scope, element) {
			element.bind('click', scope.box.goFullscreen)
			element.css({
				'background-image': 'url(' + scope.box.item.image + ')'
			})
		}
	}
})

app.directive('bigBox', function ($timeout) {
	return {
		restrict: 'AE',
		scope: {},
		bindToController: {
			position: "=",
			selected: "=",
			onSelect: "="
		},
		controllerAs: 'box',
		controller: function () {
			var box = this;
		},
		link: function (scope, element) {
			var css = {}
			for (var key in scope.box.position) {
				css[key] = scope.box.position[key] + 'px';
			}

			element.css(css);

			$timeout(function () {
				element.css({
					top: '50%',
					left: '10%'
				})
				element.addClass('image-out');
			}, 200)

			$timeout(function () {
				element.css({
					width: '80%',
					height: '100%'
				})
			}, 500)

			$timeout(function () {
				element.addClass('show');
			}, 800)
		}
	}
})