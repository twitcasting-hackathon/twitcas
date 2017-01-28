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
      })
	  .when('/logout',{
	  	templateUrl: 'template/logout.html',
		controller:  'logout'
	  })
	  .when('/callback/:param',{
	  	templateUrl: 'template/callback.html',
		controller:  'callback'
	  })
	  .when('/cruise',{
	  	templateUrl: 'template/cruise.html',
		controller: 'cruise'
	  })
});

console.log("A");
