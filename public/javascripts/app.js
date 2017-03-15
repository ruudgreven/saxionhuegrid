'use strict';

/**
 * Main module of the application.
 */
angular.module('saxionhuegrid', ['colorpicker.module', 'rzModule']);

angular.module('saxionhuegrid')
    .controller('SaxionGridCtrl', function ($scope, $http, $log) {
        $scope.lights = '';
        $scope.priceSlides = 255;

        $http.get('/grid').then(function(response){
            $scope.lights = response.data.lights;
            console.log($scope.lights);
        }, function(response) {
            console.log('error');
        });

        /**
         * Function for changing the light state
         */
        $scope.changeLight = function(light) {

            console.dir(light);
        };

        $scope.fillModal = function(light) {
            $scope.currentLight = light;
            $scope.transformedColor = "rgb(" + light.color.r + ", " + light.color.g + ", " + light.color.b + ")";
        };

    });