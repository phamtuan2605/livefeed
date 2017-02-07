'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('mkTweet')
	.directive('chat', ['Auth', function (Auth) {
		return {
        templateUrl:'scripts/directives/chat/chat.html',
        restrict: 'E',
        replace: true,
        scope:{
            /* NOTE: Normally I would set my attributes and bindings
            to be the same name but I wanted to delineate between
            parent and isolated scope. */
            list: '=messages',
            addMessage: '&addMessage',
            textMessage: '=',
        },
        controller: function ($scope) {
         
            $scope.userId = Auth.getUserId();
            $scope.$watch(function () {
                return Auth.getUserId();
            }, function (newVal, oldVal) {
                if (!newVal)
                    return;
                if (newVal !== oldVal)
                    $scope.userId = Auth.getUserId();
            });
        },
        link: function (scope, element, attrs) {
            // I listen for ping events from the parent scope chain.
           
           
            scope.$watchCollection('list', function () {
                var $list = $(element).find('.js-chat-list');
                var scrollHeight = $list.prop('scrollHeight');
                $list.animate({ scrollTop: scrollHeight }, 1);
            });

            var $chatbox__message = $(element).find('.chatbox__message');
            $chatbox__message.bind('keydown keypress', function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {

                      
                            scope.addMessage(scope.textMessage);
                            scope.textMessage = '';
    

                      
                    });
                    event.preventDefault();
                }
            });
            var chatbox = document.getElementsByClassName('chatbox');
            var chatbox__title__close = document.getElementsByClassName('chatbox__title__close');
            var chatbox__title = document.getElementsByClassName('chatbox__title');
            var chatboxVar = angular.element(chatbox);
            var chatbox__title__closeVar = angular.element(chatbox__title__close);
            var chatbox__titleVar = angular.element(chatbox__title);

            chatbox__title__closeVar.bind("click", function () {
                chatboxVar.addClass('chatbox--closed');
            });
            chatbox__titleVar.bind("click", function () {
                    chatboxVar.toggleClass('chatbox--tray');
            
            });
           
        }
    	}
	}]);


