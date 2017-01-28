var app = angular.module('app.ctrl',['ngCookies']);

app.controller('home',function($scope,$http,$cookies,$httpParamSerializerJQLike){
	console.log("home")
})

app.controller('login',function($scope,$http,$cookies,$httpParamSerializerJQLike){
	console.log("login")
})
