'use strict';
angular.module('mkTweet').controller('MainCtrl', function (Auth, $scope, $rootScope, $state) {
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    $scope.name = '';
    $scope.submit = function () {
        if($scope.name){
        var o = {
            name: $scope.name
            , userId: generateUUID()
        };
        Auth.setUser(o);
        $state.go('livefeed');}
    else
        alert('Enter your name');
    }
});