var app = angular.module('app.ctrl',['ngCookies']);

app.controller('home',function($scope,$location,$http,$cookies,$httpParamSerializerJQLike){
	$scope.login = function(){
		$location.path('/login/');
	}
	
	def = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFkNTA3ODQwMmU4OGZkMmNlNzkzMDQ2OTdkMTRjZjRlZTcwYzg1MzQxYzEwM2I2ZTZjNGJmYjA0ZGU0MTU3NzljM2NkYjczNmY4MTNjNzVjIn0.eyJhdWQiOiI3NjcyNzQ0NDUyMDMzMDg1NDUuZWYwOGUyNGYzMmUxNGQ1ZDQ5NjBkYTEyNTNhOGJmNzQyMmYzOGM1ZGM4ZWU1MTUyZTE1NzljZDNlZDg1OTlhMCIsImp0aSI6ImFkNTA3ODQwMmU4OGZkMmNlNzkzMDQ2OTdkMTRjZjRlZTcwYzg1MzQxYzEwM2I2ZTZjNGJmYjA0ZGU0MTU3NzljM2NkYjczNmY4MTNjNzVjIiwiaWF0IjoxNDg1NTkxNTA4LCJuYmYiOjE0ODU1OTE1MDgsImV4cCI6MTUwMTE0MzUwOCwic3ViIjoiMjI0OTk2NzcyMiIsInNjb3BlcyI6W119.ShTQ9jMeuw30KFAZ8PRDbk-tJyIGIQrq8ujrJdrU1RrurfcJnLJcNgwghj2B7WGBNtrsvFU0c8Rw5ZS1GRtQAcqMygRqr-Aq813huCBhPqDCcDwJL14jPJNdgEfm4CBbbhfeoVvCT9bmf9lhUxGaieilpBNrD2IGD5tB0n8Ip37F9-inzE_dehMRuPVjoJS5aKcs33un_jz_1HayED1i-sd3xAuh5k8APdWnplc4eTM3biiH-Y19iFIXxYrGlVfxiWf_P8PEXi8HBSTvCGNf0f8yimgjcoCzDiYF--xcmkbtt4W3LsYGHrsNOV6t67DI2QpYy_TaY8xZJqVsO6Ppww"

	
	$http.post('../api/live_list.php?at=' + def)
		.then(function(res){
			console.log(res.data)

			$scope.cards = [res.data[0],res.data[1],res.data[2],res.data[3]];
		})
		.catch(function(err){
			console.log(err);
		});

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
			},5000);
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
	$scope.pause = function(){
		$interval.cancel(loop);
	}
})

app.controller('history',function($scope){

});
