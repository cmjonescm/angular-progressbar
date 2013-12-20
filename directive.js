//*****************************************************************************
// Copyright © 2013 Waters Corporation. All rights reserved.
//*****************************************************************************
'use strict';

angular.module('myModule', [])
    .directive('watProgress', function() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                percent: '=',
                text: '='
            },
            templateUrl: 'progress.html'
        };
    })
    .directive('watProgressbar', [ function() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                percent: '=',
                text: '='
            },
            templateUrl: 'progressbar.html',
            link: function(scope, element) {
                scope.$watch('percent', function(value) {
                    element.css('width', value + '%');
                });
            }
        };
    }])
    .run(["$templateCache", function($templateCache) {
        $templateCache.put("progress.html", "<div class=\"progress\"><wat-progressbar percent=\"percent\" text=\"text\"></wat-progressbar></div>");

        $templateCache.put("progressbar.html",
            "<div class=\"bar\" style=\"width:80%;\">" +
                "<span class=\"show\">{{text}}</span>" +
            "</div>");
    }])
    .filter('secondsToMinutes', [
        function () {
            var ONE_MINUTE = 60;

            return function(input, dp) {
                if (angular.isUndefined(input)) return;
                return (input / ONE_MINUTE).toFixed(dp);
            }
        }
    ])
    .controller('progressController', ['$scope', 'secondsToMinutesFilter',
        function ($scope, secondsToMinutesFilter) {

            $scope.thewidth = 50;
            $scope.remainingtime = 6456;
            $scope.fluidicsState = 'Injecting';
            $scope.progressLabel;

            $scope.$watch('[fluidicsState, remainingtime]', function(newVal, oldVal) {
                $scope.progressLabel = $scope.fluidicsState + " - " + secondsToMinutesFilter($scope.remainingtime, 2) + " minutes";
            }, true);


        }
    ]);

