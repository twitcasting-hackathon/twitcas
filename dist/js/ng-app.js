var app = angular.module('app',['ngCookies','ngRoute','app.ctrl']);

app.config(function($routeProvider,$locationProvider) {
  $routeProvider
      .when('/', { 
        templateUrl: 'template/home.html',
        controller: 'home'
      })
      .when('/login',{ 
      	templateUrl: 'template/login.html',
        controller: 'login'
      });
});

console.log("A");
