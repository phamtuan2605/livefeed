'use strict';
angular.module('mkTweet').controller('FeedCtrl', ['$scope', 'FeedService', 'Auth', function ($scope, FeedService, Auth) {
    $scope.messages = [];
$scope.count=0;
    FeedService.connect();
    var j;
    FeedService.subscribe(function (m) {
        j=messageFormationObj(m);
        if(j.count)
            $scope.count=j.count;
        $scope.messages.unshift(messageFormationObj(m));
        $scope.$apply();
    });
    $scope.connect = function () {
        ChatService.connect();
    }
    $scope.send = function () {
        FeedService.send(JSON.stringify({
            name: Auth.getUserName(),
            id: Auth.getUserId(),
            message: $scope.text
        }));
        $scope.text = "";
    }
    function messageFormationObj(m) {
        return angular.fromJson(m);
    }
  }]);
angular.module('mkTweet').factory('FeedService', ['Auth', function (Auth) {
    var service = {};
    service.connect = function () {
        if (service.ws) {
            return;
        }
        var personId = (Math.ceil(Math.random() * 9));
        //         var ws = new WebSocket("ws://localhost/mk/api/chat?name=pramod&code=pr@&userId=" + Auth.getUserId());
        
        var ws = new WebSocket("ws://localhost:54464/api/livefeed?name="+Auth.getUserName()+"+&id=" + Auth.getUserId());
        ws.onopen = function (event) {
           console.log("connected");
        };
        ws.onerror = function (event) {
            service.callback({
                status: 'error'
            });
        }
        ws.onmessage = function (message) {
            service.callback(message.data);
        };
        ws.onclose = function (event) {
            service.callback(event);
        };
        service.ws = ws;
    }
    service.send = function (message) {
        service.ws.send(message);
    }
    service.subscribe = function (callback) {
        service.callback = callback;
    }
    return service;
 }]);