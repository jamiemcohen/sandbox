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

app.controller('markerMakerController', [
'$scope', function($scope){
    $scope.title ="";
    $scope.description = "";
    $scope.latitude = "";
    $scope.longitude ="";
    $scope.saveMarker = function(){
        $scope.latitude = $("#latitude").val(); 
        $scope.longitude = $("#longitude").val();
        console.log("New Marker: \n" + 
              "Title: " + $scope.title + 
              "\nDescription: " + $scope.description +
              "\nLatitude: "+ $scope.latitude +
              "\nLongitude: "+ $scope.longitude);    
        //now save and plot this data
    }
    
}]);