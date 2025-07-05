angular.module('myApp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/list.html',
                controller: 'ListController'
            })
            .when('/search', {
                templateUrl: 'views/search.html',
                controller: 'SearchController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });