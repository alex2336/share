// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.values'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .run(function(CONFIG, $rootScope, $ionicPlatform, $ionicPopup, $state) {

    Parse.initialize(CONFIG.ParseConfig.AppId, CONFIG.ParseConfig.JavascriptKey);

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      $ionicPlatform.ready(function() {
        var data = toState.data;
        var currentUser = Parse.User.current();
        if (!(data && data.access == "public") && !currentUser) {
          event.preventDefault();
          $ionicPopup.alert({
            title: "",
            template: "You need to be logged-in to view this screen."
          }).then(function onOk() {
            $state.go("public.signin");
          });
        }
      });
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    // setup an abstract state for the tabs directive
      .state('public', {
        url: "/public",
        abstract: true,
        templateUrl: "templates/public/prelogin.html"
      })
      .state('public.signin', {
        url: "/signin",
        views: {
          'main-content': {
            templateUrl: "templates/public/signin.html",
            controller: 'SignInCtrl'
          }
        },
        data: {
          access: "public"
        }
      })
      .state('public.signup', {
        url: "/signup",
        views: {
          'main-content': {
            templateUrl: "templates/public/signup.html",
            controller: 'SignUpCtrl'
          }
        },
        data: {
          access: "public"
        }
      })
      // setup an abstract state for the tabs directive
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.groups', {
        url: '/groups',
        views: {
          'tab-groups': {
            templateUrl: 'templates/tab-groups.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

    .state('tab.friends', {
        url: '/friends',
        views: {
          'tab-friends': {
            templateUrl: 'templates/tab-friends.html',
            controller: 'FriendsCtrl'
          }
        }
      })
      .state('tab.friend-detail', {
        url: '/friend/:friendId',
        views: {
          'tab-friends': {
            templateUrl: 'templates/friend-detail.html',
            controller: 'FriendDetailCtrl'
          }
        }
      })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/public/signin');

  });