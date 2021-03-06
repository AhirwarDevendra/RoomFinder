// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('FindRooms', ['ionic','ngRoute','firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'rooms/rooms.html',
    controller: 'RoomsCtrl'
  }).
    when('/details/:id', {
    templateUrl: 'rooms/details.html',
    controller: 'DetailCtrl'
  });

}])

.controller('RoomsCtrl', ['$scope','$firebaseArray', function($scope,$firebaseArray) {

      var ref = new Firebase('https://devrentfinder.firebaseio.com/rentals');

      $scope.rentals = $firebaseArray(ref);

      var id = ref.key();
}])


.controller('DetailCtrl', ['$scope','$firebaseObject','$routeParams',function($scope,$firebaseObject,$routeParams) {
  
  $scope.id = $routeParams.id;

  var ref = new Firebase('https://devrentfinder.firebaseio.com/rentals/'+$scope.id);

  var rentalData = $firebaseObject(ref);

  rentalData.$bindTo($scope,"data");

  console.log("Detail is Working");
}])

