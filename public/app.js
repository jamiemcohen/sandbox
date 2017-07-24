var filestack_API_KEY = "AFc2GWMAzS0N11VVTPG4Vz";
var app = angular.module('myApp', [
    'angular-filepicker'
]);

app.config(function(filepickerProvider){

    filepickerProvider.setKey(filestack_API_KEY);
    //<input type="filepicker" data-fp-apikey='AFc2GWMAzS0N11VVTPG4Vz'>
})

//controls uploading documents and linking data
app.controller('filestackCtrl', function($scope, $http){
    $scope.files = [];//array of files
    $scope.archive = {};
    $scope.archive.title ="";
    $scope.archive.url ="";
    $scope.youtube = "";
    $scope.spotify ="";
    var success = false;

    $scope.onSuccess = function (Blob){
        console.log(Blob);
        $scope.files.push(Blob);  
        $scope.$apply();
        var lastFile = $scope.files[$scope.files.length - 1];
        console.log(lastFile.url);
        var path = "" + lastFile.url;
        $scope.archive.url = path;
        
        alert("image upload successful, now press save" );
        
    };
    
    var mediaType = $(".dropbtn").text();
    if(mediaType == 'Youtube Link  ˇ '){
        $scope.archive.url = $scope.youtube;
       
    }else if(mediaType == 'Spotify Link  ˇ '){
        $scope.archive.url = $scope.spotify;
    }
    
    $scope.createArchive = function(){
        $http.post('/archive', $scope.archive)
            .success(function(data){
                console.log(JSON.stringify(data));
                //Clean the form to allow the user to create new archives
                $scope.archive = {};
                $scope.youtube = "";
                $scope.spotify ="";
                console.log('save succesful');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

})
.controller('archiveController', function($scope, $http){
    $scope.archives = [];
    //Retrieve all the archives to show the gallery
    $http.get('/archive')
        .success(function(data){
           
            console.log(JSON.stringify(data));
            $scope.archives = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});

app.controller('markerMakerController', [
'$scope', function($scope){
    $scope.title ="";
    $scope.description = "";
    $scope.latitude = "";
    $scope.longitude ="";
    $scope.createMarker = function(){
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
app.controller('markerController', [
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