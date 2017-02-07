'use strict';
angular.module('mkTweet').controller('ChatCtrl', ['$scope', 'ChatService', 'Auth', function ($scope, ChatService, Auth) {
    $scope.messagesWs = [];
    $scope.messages = [];
    
            $scope.messages.push(messageFormationObj(JSON.stringify({
                flag:'ChatMessage',
            message: 'hello',
            codeSender: Auth.getUserId()
        })));

    ChatService.connect();
    ChatService.subscribe(function (messagesWs) {
        $scope.messages.push(messageFormationObj(messagesWs));
        $scope.$apply();
    });
    $scope.connect = function () {
        ChatService.connect();
    }
    $scope.send = function () {
        ChatService.send(JSON.stringify({
            message: $scope.text,
            codeSender: Auth.getUserId()
        }));
        $scope.text = "";
    }

    function messageFormationObj(messagesWs) {
        return angular.fromJson(messagesWs);
    }
  }]);
angular.module('mkTweet').factory('ChatService', ['Auth', function (Auth) {
    var service = {};
    service.connect = function () {
        if (service.ws) {
            return;
        }
        var personId = (Math.ceil(Math.random() * 9));
        //         var ws = new WebSocket("ws://localhost/mk/api/chat?name=pramod&code=pr@&userId=" + Auth.getUserId());
        var ws = new WebSocket("ws://localhost/mk/api/chat?name=pramod&code=pr@&userId=" + personId);
        ws.onopen = function (event) {
            service.callback({
                status: 'connected'
            });
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