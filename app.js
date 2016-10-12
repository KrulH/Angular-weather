// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.htm',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
        })
        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
        })
});
//SERVICE
weatherApp.service('cityService', function(){
    this.city = "Adana";
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope','cityService',function($scope, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });
}]);

weatherApp.controller('forecastController', ['$scope','$resource','$routeParams','cityService' , function($scope,$resource,$routeParams, cityService) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || 2;
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=c8f37774b921a2ebc6f3560500d55fd2",
        {callback:"JSON_CALLBACK"},{ get: { method: "JSONP"}});
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt:$scope.days });
    console.log($scope.weatherResult);
    $scope.convertToFahrenheit = function(degK) {
        return Math.round(degK-273);
    };
    $scope.convertToDate = function(dt){
        return new Date(dt*1000);
    };
}]);