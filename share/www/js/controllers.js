angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('SignInCtrl', function($scope, $stateParams, Chats, $ionicPopup, $ionicLoading, $state) {
  $scope.user = {
    email: "",
    password: ""
  }
  $scope.signin = function() {
    if ($scope.user.email && $scope.user.password) {
      $ionicLoading.show({
        template: "Loading..."
      });
      Parse.User.logIn($scope.user.email, $scope.user.password).then(function onSuccess(user) {
        $state.go("tab.dash");
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