var app = angular.module('app.ctrl',['ngCookies']);

app.controller('home',function($scope,$location,$http,$cookies,$httpParamSerializerJQLike){
	$scope.login = function(){
		$location.path('/login/');
	}
})

app.controller('login',function($scope,$http,$cookies,$httpParamSerializerJQLike,$location,$window){
	if($cookies.get("token") == undefined)	$location.path("cruise");
	
	client_id = "767274445203308545.ef08e24f32e14d5d4960da1253a8bf7422f38c5dc8ee5152e1579cd3ed8599a0";
	$window.location.href = "https://apiv2.twitcasting.tv/oauth2/authorize?client_id=" + client_id + "&response_type=token";
})

app.controller('callback',function($scope,$http,$cookies,$httpParamSerializerJQLike,$window,$routeParams,$location){
	if($cookies.get("token") == undefined)	$location.path("cruise");

	param = $routeParams.param;
	params = param.split("&");
	token = params[1].split("=")[1];

	$cookies.put("token",token);
	$location.path('/cruise/');
})

app.controller('logout',function($scope,$cookies,$location){
	$cookies.remove("token");
	$location.path("/");
})

app.controller('cruise',function($scope,$http,$interval,$timeout,$cookies,$httpParamSerializerJQLike,$window,$routeParams){
	token = $cookies.get('token');
	$scope.lives = {}
	$scope.live = {}
	$scope.counter = 0;
	var loop;
	

	$http.post('../api/live_list.php?at=' + token)
		.then(function(res){
			console.log(res.data)

			$scope.lives = res.data;

			//first
			$scope.live = $scope.lives[0];
			$scope.counter++;
			$scope.getComment($scope.live.id);

			$scope.strtCast();
		})
		.catch(function(err){
			console.log(err);
		});

	$scope.strtCast = function(){
		
		loop = $interval(function(){
			$scope.counter++;
			$scope.live = $scope.lives[$scope.counter];
			console.log($scope.lives[$scope.counter]);
			$interval(function(){
				$scope.getComment($scope.live.id);
			},4000);
		},10000)
	}

	$scope.nextCast = function(){
		$scope.counter++;
		$scope.live = $scope.lives[$scope.counter];
		$interval.cancel(loop);
		$scope.strtCast();
	}

	// test
	//$scope.live.url = "http://twitcasting.tv/c:kyapirun_run/metastream.m3u8/?video=1"
	$scope.getComment = function(id){
		$http.post('../api/get_comment.php?id=' + id + "&at=" + token)
		.then(function(res){
			console.log(res.data);
			$scope.comments = res.data.comments;
		})
		.catch(function(err){
			console.log(err);
		})
	}

})

app.controller('history',function($scope){

});
