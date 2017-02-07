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
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
//      .state('dashboard.main',{
//        url:'/main',
//        templateUrl:'views/dashboard/main.html',
//        resolve: {
//          loadMyFiles:function($ocLazyLoad) {
//            return $ocLazyLoad.load({
//              name:'mkTweet',
//              files:[
//              
//              ]
//            })
//          }
//        }
//      })
      .state('livefeed',{
        templateUrl:'views/dashboard/livefeed.html',
        url:'/livefeed'
    })
     
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