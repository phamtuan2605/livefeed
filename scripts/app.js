'use strict';
/**
 * @ngdoc overview
 * @name mkTweet
 * @description
 * # mkTweet
 *
 * Main module of the application.
 */
angular
  .module('mkTweet', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('dashboard');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/main.html',
    })
      .state('livefeed',{
        templateUrl:'views/livefeed.html',
        url:'/livefeed'
    })
     
  }]).run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function (event,toState) {
console.log(toState.name);
        if (!Auth.getUser() && toState.name != 'dashboard') {
            console.log('DENY');
            event.preventDefault();
            $state.go('dashboard');
        }
    
    });
}]);

    
(function (angular) {

    function assignServicesToRootScope($rootScope, Auth) {
        $rootScope.auth = Auth;
      
    }

    // Inject dependencies
    assignServicesToRootScope.$inject = ['$rootScope', 'Auth'];

    // Export
    angular
      .module('mkTweet')
      .run(assignServicesToRootScope);

})(angular);
