var app = angular.module('myApp', [])
app.controller('markerController', [
'$scope',
function($scope) {
  $scope.markers = [
      { 
          title: "Jefferson Street",
          description: "a street"
          
      },
      { 
          title: "Jefferson Street",
          description: "a street"
          
      },
      { 
          title: "Jefferson Street",
          description: "a street"
          
      },
      { 
          title: "Jefferson Street",
          description: "a street"
          
      }
  
  
  ];
}]);

