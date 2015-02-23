angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('SignInCtrl', function($scope, $stateParams, Chats, $ionicPopup, $ionicLoading, $state, UserService) {
  $scope.user = {
    email: "",
    password: ""
  }
  $scope.init = function() {
    if (UserService.getCurrent()) {
      $state.go("tab.dash");
    }
  }
  $scope.signin = function() {
    if ($scope.user.email && $scope.user.password) {
      $ionicLoading.show({
        template: "Loading..."
      });
      Parse.User.logIn($scope.user.email, $scope.user.password).then(function onSuccess(user) {
        if (!user.get('emailVerified')) {
          //Parse.User.logOut();
          $ionicPopup.alert({
            template: "Please verify your email before signing in."
          })
        } else {
          $state.go("tab.dash");
        }
      }, function(error) {
        $ionicPopup.alert({
          template: error.message
        })
      }).always(function() {
        $ionicLoading.hide();
      })
    } else {
      $ionicPopup.alert({
        template: "Please enter username and password!"
      })
    }
  }
  $scope.init();
})

.controller('SignUpCtrl', function($scope, $stateParams, Chats, $ionicPopup, $ionicLoading, $state) {
  $scope.user = {
    email: "",
    password: "",
    cfmPassword: ""
  }
  $scope.signup = function() {
    if ($scope.user.email && $scope.user.password && $scope.user.cfmPassword) {
      if ($scope.user.password != $scope.user.cfmPassword) {
        $ionicPopup.alert({
          template: "Passwords do not match."
        })
      } else {
        if ($scope.user.password.length < 5) {
          $ionicPopup.alert({
            template: "Password too short. Should contain at least 5 characters."
          })
        } else {
          $ionicLoading.show({
            template: "Loading..."
          });
          Parse.User.signUp($scope.user.email, $scope.user.password, {
            email: $scope.user.email
          }).then(function onSuccess(user) {
            Parse.User.logOut();
            $ionicPopup.alert({
              template: "Account created successfully. Please verify your email before signing in."
            }).then(function() {
              $state.go("public.signin");
            })

          }, function(error) {
            $ionicPopup.alert({
              template: error.message
            })
          }).always(function() {
            $ionicLoading.hide();
          })
        }
      }
    } else {
      $ionicPopup.alert({
        template: "Please fill up all fields."
      })
    }
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, $state) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.signout = function() {
    Parse.User.logOut();
    $state.go("public.signin");
  }
});