var filestack_API_KEY = "AFc2GWMAzS0N11VVTPG4Vz";
var key = "abcdhjlrslamdev2017";
var app = angular.module('myApp', ['angular-filepicker','gservice']);


app.config(function(filepickerProvider){

    filepickerProvider.setKey(filestack_API_KEY);
    //<input type="filepicker" data-fp-apikey='AFc2GWMAzS0N11VVTPG4Vz'>
})


//creates a new map in the database
app.controller('createMapCtrl', function($scope, $http){
    $scope.map = {};
    $scope.map.title = "";
    $scope.map.path = "";
    $scope.map.password = "";
    $scope.confirmPassword ="";
    $scope.confirmEmail ="";
    $scope.map.email = "";
    $scope.map.markers = [];
    $scope.map.myarchive = [];
    $scope.used = false;
    
    $scope.createNewMap = function(){
       refreshFields();
        console.log($scope.map);
        console.log("invalid Data? :" + invalidData());
        var info = "";
         var errorMessages = "ERROR : ";
        $http.get('db/path/'+ $scope.map.path)
        .success(function(data){
            console.log(JSON.stringify(data));
            console.log(typeof(data));
            info = JSON.stringify(data);
            console.log(typeof(info));
            console.log(info.length);
            
                if(info.length > 4){
                    console.log('exists is true');
                     $("#url").addClass("error-state");
                    var errorMessages = "The URL you have chosen is taken. Please choose a different one. ";
                    $('#error-log').text(errorMessages);
                    $('#error-log').addClass('error-log');

                }else {
                    console.log('exists is false');


                }
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        
        
       if(!invalidData(errorMessages) && info.length <= 4){
        $http.post('/db', $scope.map)
            .success(function(data){
                console.log(JSON.stringify(data));
                $('#error-log').addClass('save-log');
                $('#error-log').text("New map created at StoryLiner.org/maps/" + $scope.map.path);
                
                var url = "http://localhost:3000/edit/" + $scope.map.path;
                //Clean the form to allow the user to create new archives
                $scope.map = {};
                $scope.confirmPassword ="";
                $scope.confirmEmail ="";
                
                 window.location.href= url;
                
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    
       }
    };
    
    //validations
    var invalidData = function(errorMessages){
        var errors = false;
       
        //emails match check    
        if( $scope.map.title == ""){
           $("#title").addClass("error-state");
            errorMessages += "Title is required. ";
            errors = true;
            
        }
         if( $scope.map.path == ""){
            $("#url").addClass("error-state");
            errorMessages += "Path is required. ";
             errors = true;
        }
         
        if( $scope.map.password == ""){
            $("#password").addClass("error-state");
            errorMessages += "Password is required.";
             errors = true;
        }
        if( $scope.confirmPassword == ""){
            $("#confirm-password").addClass("error-state");
            errorMessages += "Confirm Password is required. ";
            errors = true;
        }
        if( $scope.confirmEmail == ""){
             $("#confirm-email").addClass("error-state");
            errors = true;
            errorMessages += "Confirm Email is required. ";
        }
        if( $scope.map.email == ""){
            $("#email").addClass("error-state");
            errorMessages += "Email is required. ";
            errors = true;
        }
        
       
        
     
        
        if( $scope.map.email != $scope.confirmEmail){
             $("#confirm-email").addClass("error-state");
             $("#email").addClass("error-state");
            errorMessages += "Emails do not match. ";
            errors = true;
        
        }
        if( $scope.map.password != $scope.confirmPassword){
             $("#confirm-password").addClass("error-state");
             $("#password").addClass("error-state");
             errorMessages += "Passwords do not match. ";
            errors = true;
        
        }
        if(errors){
            $('#error-log').addClass('error-log');
            $('#error-log').text(errorMessages);
            
        }else{
            refreshFields();
        }
        return errors;
    
    
    }
    
    var refreshFields = function(){
        $('#error-log').removeClass('error-log');
        $('#error-log').text("");
        $("#title").removeClass("error-state");
        $("#url").removeClass("error-state");
        $("#email").removeClass("error-state");
        $("#confirm-email").removeClass("error-state");
        $("#password").removeClass("error-state");
        $("#confirm-password").removeClass("error-state");
    
    
    }
    
    
    
});

app.controller('markersCtrl', function($scope, $http, $gservice){
    $scope.markers = []; 
     console.log(window.location.href);
    $http.get('/marker')
        .success(function(data){
            console.log(JSON.stringify(data));
            $scope.markers = data;
             
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    gservice.refresh(36.1627, -86.7816);

});
//controls uploading documents and linking data
app.controller('filestackCtrl', function($scope, $http){
    console.log(window.location.href);
    
    //get current location for db access
    var path = window.location.href;
    path = path.replace('http://localhost:3000/edit/', '');
    $scope.map = {};
    $scope.map._id = "";
    $scope.map.myarchive =[];
    $scope.map.markers =[];
    $http.get('../db/path/'+ path)
        .success(function(data){
            console.log(JSON.stringify(data));
           $scope.map._id = data._id;
           $scope.map.myarchive =data.myarchive;
            $scope.map.markers = data.markers;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.files = [];//array of files
    $scope.archive = {};
    $scope.archive.title ="";
    $scope.archive.url ="";
    $scope.youtube = "";
    $scope.spotify ="";
    var type = "img";
    
    
    
    
    
    $scope.onSuccess = function (Blob){
        console.log(Blob);
        $scope.files.push(Blob);  
        $scope.$apply();
        var lastFile = $scope.files[$scope.files.length - 1];
        console.log(lastFile.url);
        var path = "" + lastFile.url;
        $scope.archive.url = path;
        
    };
    
    $scope.selectVid = function(){
        type = "vid";
        console.log("selected a vid");
    };
    $scope.selectMusic = function(){
        type = "music";
        console.log("selected a music");
    };
    $scope.selectImg = function(){
        type = "img";
        console.log("selected an img");
    };
    
    
    $scope.createArchive = function(){
        if(type == 'vid'){
            $scope.archive.url = youtubeLinkParse($scope.youtube);
            

        }else if(type == 'music'){
            $scope.archive.url = spotifyLinkParse($scope.spotify);
        }
        
        //add all fields to marker array
        $scope.map.myarchive.push({title: $scope.archive.title, link: $scope.archive.url});
        console.log( $scope.map.myarchive);
        $http.put('/db/'+ $scope.map._id, {myarchive: $scope.map.myarchive, markers: $scope.map.markers})
            .success(function(data){
                console.log($scope.map._id);
                console.log($scope.map.myarchive);
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

});

app.controller('archiveController', function($scope, $http, $sce){
    var path = window.location.href;
    path = path.replace('http://localhost:3000/edit/', '');
    $scope.map = {};
    $scope.map._id = "";
    $scope.myarchive =[];
         
    var refreshData = function(){
        $http.get('../db/path/'+ path)
        .success(function(data){
            console.log(JSON.stringify(data));
           $scope.map._id = data._id;
           $scope.myarchive = data.myarchive;
            console.log(JSON.stringify($scope.myarchive));  
           
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
       
        $http.get('../db/'+  $scope.map._id )
        .success(function(data){
            console.log(JSON.stringify(data));
            $scope.myarchive = data.myarchive ;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    
    };
    
    
    refreshData();
    
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    
   
    //Retrieve all the archives to show the gallery
    
    $scope.removeItem = function(archive) {
        console.log('removing' );
        /*$http.delete('/archive/delete/'+ archive._id)
        .success(function(data){
            console.log(data);
          
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        
        refreshData();*/
    };
    
    $scope.refresh = function(){
        $http.get('../db/'+  $scope.map._id)
        .success(function(data){
            $scope.myarchive = data.myarchive ;
          
             
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        
       
    };
    
    $http.get('../db/'+  $scope.map._id)
        .success(function(data){
           
            
             $scope.myarchive = data.myarchive ;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    
    $('#archive-button').click(function(){
        refreshData();
    
    });
});

app.controller('adminArchiveController', function($scope, $http, $sce){
    $scope.archives = {};
   
  
         
    var refreshData = function(){
        $http.get('/archive')
        .success(function(data){
            console.log(JSON.stringify(data));
            $scope.archives = data;
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    };
    
    $scope.arrayToString = function(meta){
        return meta.toString();
    
    }
    
    
    refreshData();
    
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    
   
    //Retrieve all the archives to show the gallery
    
    $scope.removeItem = function(archive) {
        if (confirm('Are you sure you want to delete this?')) {
        // if the answer is "Ok".
            $http.delete('/archive/delete/'+ archive)
                .success(function(data){
                    
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

                refreshData();
            };
        }
        
    
    $scope.refresh = function(){
       refreshData();
    };
    
    $("#manage-btn").on('click', function(){
        refreshData();    
    });
    
    $scope.edit = function(archive){
        url = 'http://localhost:3000/pqw4ry/edit/' + archive;
        window.location.href = url;
    
    }
   
    
});



app.controller('markerMakerController', [
'$scope', 'gservice', function($scope){
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

app.controller('adminController', ['$scope', '$http', '$sce', function($scope, $http, $sce){
    $scope.password ="";
    $scope.submitPassword = function(){
            if($scope.password != ""){
                console.log($scope.password)
                if($scope.password == key){
                    $('#login').hide();
                     window.location.href= 'http://localhost:3000/pqw4ry';
                    
                }else{
                     $('#legend').text("Sorry, That password is incorrect");
                
                }
            
            
            }else{
                $('#legend').text("ERROR: Password cannot be blank");
            
            }
    
    
    }
    
}]);


app.controller('markerController', [
'$scope', '$http', '$sce', function($scope, $http, $sce){
    
     $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
     
    var path = window.location.href;
    path = path.replace('http://localhost:3000/edit/', '');
    
    $scope.marker = {};
    $scope.marker.title ="";
    $scope.marker.description = "";
    $scope.marker.latitude = "";
    $scope.marker.longitude ="";
    $scope.marker.media =[];
    $scope.archives = [];
    $scope.id = "";
    $scope.addedLinks = [];
    $scope.map = {};
    $scope.map.markers = [];
    $scope.map.myarchive = [];
    
    //refresh admin archive
    var refreshArchiveData = function(){
        $http.get('/archive')
            .success(function(data){
                $scope.archives = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
  
    //refresh personal archive
     var refreshMyArchiveData = function(){
        $http.get('../db/path/'+ path)
        .success(function(data){
            console.log(JSON.stringify(data));
           $scope.id = data._id;
           $scope.map.myarchive = data.myarchive;
            $scope.map.markers = data.markers;
           $scope.map = data; 
           
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
       
        $http.get('../db/'+  $scope.id )
        .success(function(data){
            $scope.map.myarchive = data.myarchive ;
            $scope.map.markers = data.markers;
            $scope.map = data; 
            console.log($scope.map.markers);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    
    };
    
    
    refreshMyArchiveData();
    refreshArchiveData();
    
    
    
    $scope.addMedia = function(link){
        
         if(!$scope.addedLinks.includes(link)){ //link not previously added
            $scope.addedLinks.push(link);
         }
       
    }
    
    $scope.removeMedia = function(link){
        var index = $scope.addedLinks.indexOf(link);
        if (index > -1) {
            $scope.addedLinks.splice(index, 1);
        };
        
    
    }
    
    $scope.refresh= function(){
            refreshMyArchiveData();
            refreshArchiveData();
    
    };
    
    $('#addMedia-btn').click(function(){
        refreshMyArchiveData();
        refreshArchiveData();                                             
    });
    
    $scope.saveMarker = function(){
        
        //push each link onto marker media list
        for(var i=0; i<$scope.addedLinks.length; i ++){
                $scope.marker.media.push($scope.addedLinks[i]);
                
        }
        console.log($scope.marker.media);
        //get lat and long value -- often not updated because of jquery input method
        $scope.marker.latitude = $("#latitude").val(); 
        $scope.marker.longitude = $("#longitude").val();
        
        //push the marker to the marker array of a map
        refreshMyArchiveData();
        console.log($scope.map.markers);
        if($scope.marker.media == null){
            $scope.map.markers.push({title: $scope.marker.title, description: $scope.marker.description, latitude:$scope.marker.latitude, longitude: $scope.marker.longitude});
        }else{
        $scope.map.markers.push({title: $scope.marker.title, description: $scope.marker.description, latitude:$scope.marker.latitude, longitude: $scope.marker.longitude, media: $scope.marker.media});
        }
        //post the marker
         $http.put('/db/'+ $scope.id, {myarchive: $scope.map.myarchive, markers: $scope.map.markers})
            .success(function(data){
                console.log(JSON.stringify(data));
                //Clean the form to allow the user to create new markers
                $scope.addedLinks= [];
                $scope.marker = {};
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    };
    
 
    
    
   
}]);


    

app.controller('markersCtrl', function($scope, $http, gservice){
    var path = window.location.href;
    path = path.replace('http://localhost:3000/edit/', '');
    $scope.map = {};
    $scope.map.markers = []; 
    $scope.map.id =""
    
    var refreshMarkerData = function(){
        $http.get('../db/path/'+ path)
        .success(function(data){
            console.log(JSON.stringify(data));
           $scope.map.id = data._id;
           $scope.map = data; 
           
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
       
        $http.get('../db/'+  $scope.map.id )
        .success(function(data){
         
            $scope.map.markers = data.markers;
            $scope.map = data; 
            console.log($scope.map.markers);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    
    };
   
   
    refreshMarkerData();
    
     /*$('#markers-button').on('click', function(){
        refreshMarkerData()
        
    
    });*/
    
    
    gservice.refresh(36.1627, -86.7816);

});
//controls uploading documents for admin and linking data
app.controller('adminUploadController', function($scope, $http){
    //instantiates scope variables
    $scope.files = [];//array of files
    $scope.archive = {}; //archive object to be put in db
    $scope.archive.title ="";
    $scope.archive.url ="";
    $scope.archive.description ="";
    $scope.archive.metadata = [];
    $scope.meta = "";
    $scope.youtube = "";
    $scope.spotify ="";
    $scope.type = "image";
    
    
    
    
    
    $scope.onSuccess = function (Blob){
        console.log(Blob);
        $scope.files.push(Blob);  
        $scope.$apply();
        var lastFile = $scope.files[$scope.files.length - 1];
        console.log(lastFile.url);
        var path = "" + lastFile.url;
        $scope.archive.url = path;
        
    };
    
    $scope.selectMedia = function(){
        if($("#state").val() == 'youtube'){
            $scope.type= "youtube";
            console.log('video selected');
        }
       if($("#state").val() == 'spotify'){
            $scope.type = "spotify";
            console.log('music selected');

        }
        if($("#state").val() == 'image'){
             $scope.type = "image";
            console.log('image selected');

        }
       
    };
    $scope.createArchive = function(){
        if($scope.type == 'youtube'){
            $scope.archive.url = youtubeLinkParse($scope.youtube);
            

        }else if($scope.type == 'spotify'){
            $scope.archive.url = spotifyLinkParse($scope.spotify);
        }
        console.log($scope.meta);
        console.log($scope.meta.split(','));
        $scope.archive.metadata = $scope.meta.split(',');
        console.log($scope.archive.metadata);
        if(true){
            successMessage();
            
            $http.post('/archive', $scope.archive)
                .success(function(data){
                    console.log(JSON.stringify(data));
                    //Clean the form to allow the user to create new archives
                    $scope.archive = {};
                    $scope.youtube = "";
                    $scope.spotify ="";
                    $scope.meta="";
                    console.log('save succesful');

                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
       }
    };
    
    
    
    var successMessage = function(){
        $('#error-log').text('Upload Succesful!')
        $('#error-log').addClass('success');
        $('#error-log').fadeOut(1000);
    }

});


app.controller('adminEditController', function($scope, $http){
    //instantiates scope variables
    $scope.archive = {}; //archive object to be put in db 
    $scope.archive.title = "";
    $scope.archive.descrption = "";
    $scope.archive.metadata = [];
    $scope.meta = "";
    var path = window.location.href;
    path = path.replace('http://localhost:3000/pqw4ry/edit/', '');
         
    var refreshData = function(){
        $http.get('../../archive/'+ path)
        .success(function(data){
            $scope.archive = data;
            $scope.archive.metadata = data.metadata;
            $scope.meta = $scope.archive.metadata.toString();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
 
    };
    
    
    refreshData();
    
     $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
  
     $scope.saveArchive = function(){
        $scope.archive.metadata = $scope.meta.split(',');
        $http.put('../../archive/'+ $scope.archive._id, {title: $scope.archive.title, description: $scope.archive.description, metadata: $scope.archive.metadata})
                .success(function(data){
                   
                    console.log(JSON.stringify(data));
                    window.location.href = 'http://localhost:3000/pqw4ry/';
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

     
     
     
     }
    
    
    $scope.removeItem = function(archive) {
        if (confirm('Are you sure you want to delete this?')) {
        // if the answer is "Ok".
            $http.delete('../../archive/delete/'+ archive)
                .success(function(data){
                    
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

                refreshData();
            };
        }
        


});

app.controller('admin-archive-Controller', function($scope, $http, $sce){
    var path = window.location.href;
    path = path.replace('http://localhost:3000/pqw4ry/archive/', '');
    $scope.map = {};
    $scope.myarchive =[];
         
    var refreshData = function(){
        $http.get('../../db/'+ path)
        .success(function(data){
           $scope.myarchive = data.myarchive;
         
           
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
       
    
    
    };
    
    
    refreshData();
    
     $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    
    
    $scope.arrayToString = function(meta){
        return meta.toString();
    
    }
    


});


app.controller('admin-markers-Controller', function($scope, $http, $sce){
    var path = window.location.href;
    path = path.replace('http://localhost:3000/pqw4ry/marker/', '');
    $scope.map = {};
    $scope.markers ={};
    $scope.links = []
         
    var refreshData = function(){
        $http.get('../../db/'+ path)
        .success(function(data){
           $scope.markers = data.markers;
            $scope.links = $scope.markers.media;
           console.log(data.markers);
            console.log($scope.markers);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
       
    
    
    };
    
    
    refreshData();
    
     $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    
    
   


});


app.controller('adminMapsController', function($scope, $http, $sce){
    $scope.maps ={};
    var refreshData = function(){
        $http.get('../db')
        .success(function(data){
            console.log(JSON.stringify(data));
           $scope.maps = data;
                
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
    
    refreshData();
    
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    
    $scope.showArchiveTable = function(map){
        var url = 'http://localhost:3000/pqw4ry/archive/' + map
        window.location.href= url;
            

    };
    
    $scope.showMarkersTable = function(map){
        var url = 'http://localhost:3000/pqw4ry/marker/' + map
        window.location.href= url;
            

    };
   
    
   
    
    
    
    $scope.removeMap = function(map) {
        if (confirm('Are you sure you want to delete this?')) {
        // if the answer is "Ok".
            $http.delete('/db/delete/'+ map)
                .success(function(data){
                    
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

                refreshData();
            };
        }
        

});




var youtubeLinkParse  = function(link){
    //remove timestamp -- youtube embed links cannot have timestamps
    if(link.includes('?t=')){
        var index = link.indexOf('?t=');
        link = link.substring(0, index);
    }
    
    //alter link to replace default action
    link = link.replace("youtu.be", "youtube.com/embed");
    return link.replace("watch?v=", "embed/");
}

var spotifyLinkParse  = function(link){
    link = link.replace('open', "embed");
    if(link.includes('track')){
        return link.replace("track/", "?uri=spotify%3Atrack%3A");
    
    }else if(link.includes('artist')){
        return link.replace("artist/", "?uri=spotify%3Aartist%3A");
    
    }else if(link.includes('album')){
        return link.replace("album/", "?uri=spotify%3Aalbum%3A");
    
    
    }else if(link.includes('playlist')){
        var n = 5 + link.indexOf('user'); //length of 'user/' + index of user 
        var user = "";
        while(link.charAt(n) != '/'){ //get user's name
            user = link.charAt(n);
            n++;    
        }
        var currentPath = 'user/'+ user +"/playlist/";
        var newPath= '?uri=spotify%3Auser%3A' + user + '%3Aplaylist%3A';
        return link.replace(currentPath, newPath);
    
    }else{
    
        return link;
    }
    
}








