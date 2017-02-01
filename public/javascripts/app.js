'use strict';

/**
 * Main module of the application.
 */
angular.module('saxionhuegrid', [
]);

angular.module('saxionhuegrid')
    .controller('SaxionGridCtrl', function ($scope, $http, $log) {
        $scope.lights = '';

        $http.get('/grid').then(function(response){
            $scope.lights = response.data.lights;
            console.log($scope.lights);
        }, function(response) {
            console.log('error');
        });
    });