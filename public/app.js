
var filestack_API_KEY = "AFc2GWMAzS0N11VVTPG4Vz";
var key = "abcdhjlrslamdev2017";
var app = angular.module('myApp', ['angular-filepicker','gservice']);
var null_value_length = 4;
var BASE_URL = 'http://localhost:3000';


app.config(function(filepickerProvider){

    filepickerProvider.setKey(filestack_API_KEY);
    //<input type="filepicker" data-fp-apikey='AFc2GWMAzS0N11VVTPG4Vz'>
})


//creates a new map in the database
app.controller('createMapCtrl', function($scope, $http){
    //initialize scope variables
    $scope.map = {};
    $scope.login_url = "";
    $scope.login_password = "";
    $scope.login_email = "";
    $scope.map.title = "";
    $scope.map.path = "";
    $scope.map.password = "";
    $scope.confirmPassword ="";
    $scope.confirmEmail ="";
    $scope.map.email = "";
    $scope.map.markers = [];
    $scope.map.myarchive = [];
    $scope.used = false; //field to track whether field has been used before
    
  
    $scope.login = function(){
        
        //findone with url
             $http.get('db/path/'+ $scope.login_url) 
                .success(function(data){
               // console.log(JSON.stringify(data)); //DEBUG
                var mapData = JSON.stringify(data);
                    if(mapData.length > null_value_length){ //exists
                       //check if passwords match
                        if($scope.login_password == data.password){
                            //direct to url if logged in 
                            getBaseUrl();
                             window.location.href=  BASE_URL + '/edit/' + $scope.login_url;
                        }else{
                        //error message if password invalid
                            $('#error-login').text('Password does not match URL');
                        }

                    }else{

                     //error message if not valid
                       $('#error-login').text('URL not valid');
                    }
                })
                .error(function(data) {
                 console.log('Error: ' + data);
                });

    };
        $scope.sendEmail = function(){
            $http.get('db/path/'+ $scope.login_url) 
                .success(function(data){
                    if($scope.login_email == data.email){//matches an existing email
                    $("#error-login-forgot").text ("Your Password is " + data.password);
                        console.log('your password is' + data.password);
                    }else{
                    
                     $("#error-login-forgot").text("That Email and URL combination do not match ");    
                    }
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            
            
        }
                
    
    
    
    
    
    
     
    $scope.createNewMap = function(){
       refreshFields(); //refreshs styling properties
        //console.log($scope.map); //DEBUG
        //console.log("invalid Data? :" + invalidData()); //DEBUG
        var info = ""; //initialize string variable 
         var errorMessages = "ERROR : "; // collects error messages
        $http.get('db/path/'+ $scope.map.path.toLowerCase()) 
        .success(function(data){
            //console.log(JSON.stringify(data)); //DEBUG
            //console.log(typeof(data)); //DEBUG
            info = JSON.stringify(data);//DEBUG
            //console.log(typeof(info));//DEBUG
            //console.log(info.length);//DEBUG
            
            //Checking that the URL/Pathname does not exist in the DB already 
                if(info.length > 4){// if map already exists, will return a record with length greater than 4, else will be null
                    //console.log('exists is true'); //DEBUG
                     $("#url").addClass("error-state"); //add error states
                    var errorMessages = "The URL you have chosen is taken. Please choose a different one. ";
                    $('#error-log').text(errorMessages);
                    $('#error-log').addClass('error-log');

                }else {
                    //console.log('exists is false'); //DEBUG


                }
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        
        
       if(!invalidData(errorMessages) && info.length <= 4){ // if no errors and record does not exist in DB (i.e. equals nulls)
        var url  = "";
           $http.post('/db', $scope.map) //create the map
            .success(function(data){
                //console.log(JSON.stringify(data)); //DEBUG
                $('#error-log').addClass('save-log'); // CSS styling success 
               getBaseUrl();
                $('#error-log').text("New map created at " + BASE_URL +"/maps/" + $scope.map.path.toLowerCase());
                
               getBaseUrl(); 
               url =  BASE_URL + "/edit/" + $scope.map.path.toLowerCase(); //new path to navigate to 
                //Clean the form to allow the user to create new 
                $scope.map = {};
                $scope.confirmPassword ="";
                $scope.confirmEmail ="";
                
                //move to editor page
                 window.location.href= url;
                
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
            .finally(function() {
               //window.location.href= url;
            });

           
    
        }
    };
    
    //validations
    var invalidData = function(errorMessages){
        var errors = false;
       
        //title not empty check
        if( $scope.map.title == ""){
           $("#title").addClass("error-state");
            errorMessages += "Title is required. ";
            errors = true;
            
        }
        //path not empty check
         if( $scope.map.path == ""){
            $("#url").addClass("error-state");
            errorMessages += "Path is required. ";
             errors = true;
        }
         //password not empty check
        if( $scope.map.password == ""){
            $("#password").addClass("error-state");
            errorMessages += "Password is required.";
             errors = true;
        }
        //confirm password not empty check
        if( $scope.confirmPassword == ""){
            $("#confirm-password").addClass("error-state");
            errorMessages += "Confirm Password is required. ";
            errors = true;
        }
        //confirm email not empty check
        if( $scope.confirmEmail == ""){
             $("#confirm-email").addClass("error-state");
            errors = true;
            errorMessages += "Confirm Email is required. ";
        }
        //email not empty check
        if( $scope.map.email == ""){
            $("#email").addClass("error-state");
            errorMessages += "Email is required. ";
            errors = true;
        }
        
       
        
     
        //email and confirm email check
        if( $scope.map.email != $scope.confirmEmail){
             $("#confirm-email").addClass("error-state");
             $("#email").addClass("error-state");
            errorMessages += "Emails do not match. ";
            errors = true;
        
        }
        //password and confirm password check
        if( $scope.map.password != $scope.confirmPassword){
             $("#confirm-password").addClass("error-state");
             $("#password").addClass("error-state");
             errorMessages += "Passwords do not match. ";
            errors = true;
        
        }
        
        //updates css styling if therer are errors
        if(errors){
            $('#error-log').addClass('error-log');
            $('#error-log').text(errorMessages);
            
        }else{
            refreshFields(); // if no errors refresh fields
        }
        return errors;
    
    
    }
    
    
   
    
       
    //method to reset all styling for css
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



//controls uploading documents and linking data
app.controller('filestackCtrl', function($scope, $http){
    
    //get current location for db access
    var path = window.location.href;
    getBaseUrl();
    path = path.replace(BASE_URL + '/edit/', '');
    
    //initialize scope variables
    $scope.map = {};
    $scope.map._id = "";
    $scope.map.myarchive =[]; 
    $scope.map.markers =[]; //array of markers needed for post request
    
    //get marker data
    $http.get('../db/path/'+ path)
        .success(function(data){
            //console.log(JSON.stringify(data)); //DEBUG
           $scope.map._id = data._id; //get map id
           $scope.map.myarchive =data.myarchive; // get array ofmap archive
            $scope.map.markers = data.markers; // get array of markers
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    //initialize filestack control variables
    $scope.files = [];//array of files
    
    //initiliaze form data
    $scope.archive = {};
    $scope.archive.title ="";
    $scope.archive.url ="";
    $scope.youtube = "";
    $scope.spotify ="";
    var type = "img";
    
    
    
    
    //filestack uplaoder method
    $scope.onSuccess = function (Blob){
        //console.log(Blob); //DEBUG
        $scope.files.push(Blob);  //place uplaod on files  array
        $scope.$apply();
        var lastFile = $scope.files[$scope.files.length - 1]; //get the last file uploaded 
        //console.log(lastFile.url);  // DEBUG
        var path = "" + lastFile.url; //get path of record needed
        $scope.archive.url = path; // set path to scope field
        
    };
    
    //functions to specify type of selected data
    
    //video selected
    $scope.selectVid = function(){
        type = "vid";
        //console.log("selected a vid"); //DEBUG
    };
    
    //music selected
    $scope.selectMusic = function(){
        type = "music";
        //console.log("selected a music"); //DEBUG
    };
    //image selected
    $scope.selectImg = function(){
        type = "img";
        //console.log("selected an img"); //DEBUG
    };
    
    
    //create new archive on button click
    $scope.createArchive = function(){
        
        //parse links based on link type -- image uploads don't need parsing
        if(type == 'vid'){ //youtube link
            $scope.archive.url = youtubeLinkParse($scope.youtube); 
            

        }else if(type == 'music'){ //spotify link
            $scope.archive.url = spotifyLinkParse($scope.spotify);
        }
        
        //add all fields to marker array
        
        //push new array onto existing array
        $scope.map.myarchive.push({title: $scope.archive.title, link: $scope.archive.url});
        //console.log( $scope.map.myarchive); //DEBUG
        
        //post the archive data
        $http.put('/db/'+ $scope.map._id, {myarchive: $scope.map.myarchive, markers: $scope.map.markers})
            .success(function(data){
                //console.log($scope.map._id); //DEBUG
                //console.log($scope.map.myarchive); //DEBUG
                //console.log(JSON.stringify(data));//DEBUG
            
                //Clean the form to allow the user to create new archives
                $scope.archive = {};
                $scope.youtube = "";
                $scope.spotify ="";
                //console.log('save succesful'); //DEBUG
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});

//archive controller
app.controller('archiveController', function($scope, $http, $sce){
    //get current location of path
    var path = window.location.href;
    getBaseUrl();
    path = path.replace( BASE_URL + '/edit/', '');
    
    
    //initialize scope variables
    $scope.map = {};
    $scope.map._id = "";
    $scope.myarchive =[];
    $scope.map.markers = [];
    $scope.sandbox = {};
    $scope.archives = {};
    $scope.modalArchive = {};
         
    //refresh data method
    var refreshData = function(){
        $http.get('../db/path/'+ path)
        .success(function(data){
            //console.log(JSON.stringify(data)); //DEBUG
           $scope.map._id = data._id; //initialize map id
           $scope.myarchive = data.myarchive; //initalize myarchive
            $scope.map.markers =  data.markers; //initialize markers (for post request)
           // console.log(JSON.stringify($scope.myarchive));   //DEBUG
           
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
        
        $http.get('../archive')
        .success(function(data){
             $scope.archives = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    
       
    
    
    };
    
    
    refreshData(); //refresh data 
    
    //Method to trust youtibe & spotify linke srcs
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    
   
    //Remove an archive element
    $scope.removeItem = function(archive) {
         refreshData(); 
       // console.log('removing' ); //DEBUG
         if (confirm('Are you sure you want to delete this?')) { //confirming the delete action
            //remove the record from array
            for( var i= $scope.myarchive.length-1; i>=0; i--) { //scan myarchive array and locate the archive
                if( $scope.myarchive[i]._id == archive) { //match the id's of selected item
                    $scope.myarchive.splice(i,1); //remove at the selected index by splicing it
                }
            }
            //post the archive
            $http.put('/db/'+ $scope.map._id, {myarchive: $scope.myarchive, markers: $scope.map.markers})  
                .success(function(data){
                    //console.log(JSON.stringify(data)); //DEBUG

                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });


            refreshData(); //refresh data after removing
         }
    };
    
 
    
    $http.get('../db/'+  $scope.map._id)
        .success(function(data){
           
            
             $scope.myarchive = data.myarchive ;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    

    
    
   
    //refresh archive data on button click
    $('#archive-button').click(function(){
        refreshData();
    
    });
    
    
    
    $scope.openSandboxModal = function(archive){
        $('#sandbox_hider').show();
        $('#sandbox_popup_box').show();
         var document_height = $( document ).height();
        $("#sandbox_hider").css('height', document_height);
        $scope.sandbox = archive;
       
    };
    
    
    //on click hide the modal and return original view
    $("#sandbox_buttonClose").click(function () {

        closeSandboxModal();

    });
    //on escape key, close the modal
    $(document).keyup(function(e) {
        if (e.keyCode == KEYCODE_ESC) {
            closeSandboxModal();
        }
    });

    //close the modal by hiding the hider div and modal box, then showing the page content again
    var closeSandboxModal = function(){
        $("#sandbox_hider").fadeOut("slow");
        $('#sandbox_popup_box').fadeOut("slow");
       


    }
    
    
     $('#archive-button').click(function(){
        refreshData();
    
    });
    
    
    
    $scope.openMyArchiveModal = function(archive){
        $('#myarchive_hider').show();
        $('#myarchive_popup_box').show();
         var document_height = $( document ).height();
        $("#myarchive_hider").css('height', document_height);
        $scope.modalArchive = archive;
       
    };
    
    
    //on click hide the modal and return original view
    $("#myarchive_buttonClose").click(function () {

        closeMyArchiveModal();

    });
    //on escape key, close the modal
    $(document).keyup(function(e) {
        if (e.keyCode == KEYCODE_ESC) {
            closeMyArchiveModal();
        }
    });

    //close the modal by hiding the hider div and modal box, then showing the page content again
    var closeMyArchiveModal = function(){
        $("#myarchive_hider").fadeOut("slow");
        $('#myarchive_popup_box').fadeOut("slow");
       


    }
    
    $scope.arrayToString = function(meta){
        if(!(meta == "undefined")){
            return meta.toString();
        }
    
    }
    
});

//controls the admin's archive
app.controller('adminArchiveController', function($scope, $http, $sce){
     var KEYCODE_ESC = 27;
    
    //initialize scope variable
    $scope.archives = {};
    $scope.sandbox = {};
   
  
    //refresh data function
    var refreshData = function(){
        $http.get('/archive')
        .success(function(data){
            //console.log(JSON.stringify(data)); //DEBUG
            $scope.archives = data; //set archive data
            
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    };
    
    refreshData();
    
    //Array to String helper method 
    //returns a string
    $scope.arrayToString = function(meta){
        return meta.toString();
    
    }
    
    
    
    //trust source method for youtube and spotify links
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    
   
   
    
    //remove and item
    $scope.removeItem = function(archive) {
        if (confirm('Are you sure you want to delete this?')) { //confirm deletion
        // if the answer is "Ok".
            $http.delete('/archive/delete/'+ archive) //delete the archive
                .success(function(data){
                    
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

                refreshData(); //refresh data after deletion
            };
        }
        
    
    $scope.refresh = function(){
       refreshData(); //refresh data method
    };
    
    $("#manage-btn").on('click', function(){ // refresh data on opening the menu
        refreshData();    
    });
   
    $scope.edit = function(archive){ // edit button takes you to edit page
        getBaseUrl();
        url = BASE_URL + '/pqw4ry/edit/' + archive;
        window.location.href = url;
    
    }
    
     
    $scope.openSandboxModal = function(archive){
        $('#archive_hider').show();
        $('#archive_popup_box').show();
         var document_height = $( document ).height();
        $("#archive_hider").css('height', document_height);
        $scope.sandbox = archive;
       
    };
    
    
    //on click hide the modal and return original view
    $("#archive_buttonClose").click(function () {

        closeSandboxModal();

    });
    //on escape key, close the modal
    $(document).keyup(function(e) {
        if (e.keyCode == KEYCODE_ESC) {
            closeSandboxModal();
        }
    });

    //close the modal by hiding the hider div and modal box, then showing the page content again
    var closeSandboxModal = function(){
        $("#archive_hider").fadeOut("slow");
        $('#archive_popup_box').fadeOut("slow");
       


    }
    
    
   
    
});


//admin login controller
app.controller('adminController', ['$scope', '$http', '$sce', function($scope, $http, $sce){
    //initialize scope variables
    $scope.password ="";
    
    //submit password and redirect to admin page if correct
    $scope.submitPassword = function(){
            if($scope.password != ""){ //check that it is not blank
                console.log($scope.password)
                if($scope.password == key){ //if it is correct go to admin panel
                    $('#login').hide();
                    getBaseUrl();
                     window.location.href= BASE_URL + '/pqw4ry';
                    
                }else{ //error message
                     $('#legend').text("Sorry, That password is incorrect");
                
                }
            
            
            }else{
                $('#legend').text("ERROR: Password cannot be blank");
            
            }
    
    
    }
    
}]);


//Markers Maker controller
app.controller('createController', ['$scope', '$http', '$sce', function($scope, $http, $sce){
    console.log('in controller');
    //trust source for spotify & youtube links 
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
     
    //get current location
    var path = window.location.href;
    getBaseUrl();
    path = path.replace( BASE_URL + '/edit/', '');
    console.log('in controller:' + path);
    
    //initialize scope variables
    $scope.marker = {};
    $scope.marker.title ="";
    $scope.marker.description = "";
    $scope.marker.latitude = "";
    $scope.marker.longitude ="";
    $scope.marker.media =[];
    $scope.marker.order = "";
    $scope.archives = []; //admin archives
    $scope.id = "";
    $scope.addedLinks = []; //array to keep track of added links
    $scope.map = {};
    $scope.map.markers = [];
    $scope.map.myarchive = []; //personal archive
    
    //refresh admin archive
    var refreshArchiveData = function(){
        console.log('refreshing');
        $http.get('../../archive')
            .success(function(data){
                $scope.archives = data;
                console.log('data');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    refreshArchiveData(); //get admin archive
    
    $('#addMedia-btn-sandbox').on('click', function(){
        console.log("HELLO");
        refreshArchiveData();
        console.log($scope.archives );
    });
  
    //refresh personal archive
     var refreshMyArchiveData = function(){
        //refresh path 
        path = window.location.href;
         getBaseUrl();
        path = path.replace(BASE_URL + '/edit/', '');
         
        
         
        $http.get('../db/path/'+ path)
        .success(function(data){
            //console.log(JSON.stringify(data)); //DEBUG 
           $scope.id = data._id; //get id
           $scope.map.myarchive = data.myarchive; //get personal archive
            $scope.map.markers = data.markers; //get markers
           $scope.map = data; 
           
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    };
    
    
    refreshMyArchiveData(); //get personal archive
    
    
    
    //add links to the array of links
    $scope.addMedia = function(link){
         console.log("ADDING A LINK");
         if(!$scope.addedLinks.includes(link)){ //link not previously added (no duplicates)
            $scope.addedLinks.push(link);
             
         }
       
    }
    
    $scope.removeMedia = function(link){
        var index = $scope.addedLinks.indexOf(link);
        if (index > -1) {
            $scope.addedLinks.splice(index, 1);
        };
        
    
    }
    
    //refresh button 
    $scope.refresh= function(){
            refreshMyArchiveData();
            refreshArchiveData();
    
    };
    
    //refresh archive on  button click
    $('#addMedia-btn').click(function(){
        refreshMyArchiveData();
        refreshArchiveData();                                             
    });
    
    //save marker
    $scope.saveMarker = function(){
        
        refreshMyArchiveData(); //refresh scope variables again
       
        if($scope.addedLinks.length>0){ //if there are links to add
            
           // console.log($scope.marker.media); //DEBUG
            $scope.marker.media =[]; //clear out scope variable
            
            //push each link onto marker media list
            for(var i=0; i<$scope.addedLinks.length; i ++){
                    
                    $scope.marker.media.push($scope.addedLinks[i]);

            }
        }
  
        //get lat and long value -- often not updated because of jquery input method
        $scope.marker.latitude = $("#latitude").val(); 
        $scope.marker.longitude = $("#longitude").val();
        $scope.marker.order = $scope.map.markers.length +1;
        //push the marker to the marker array of a map
        refreshMyArchiveData(); // ensures scope variables will not be null
        
        //add marker to array of markers
        if($scope.marker.media == null){ //if no links - don't include media field
            $scope.map.markers.push({title: $scope.marker.title, description: $scope.marker.description, latitude:$scope.marker.latitude, longitude: $scope.marker.longitude, order: $scope.marker.order});
        }else{ //new links to be added
        $scope.map.markers.push({title: $scope.marker.title, description: $scope.marker.description, latitude:$scope.marker.latitude, longitude: $scope.marker.longitude, media: $scope.marker.media, order: $scope.marker.order});
        }
        
        //post the marker
         $http.put('/db/'+ $scope.id, {myarchive: $scope.map.myarchive, markers: $scope.map.markers})
            .success(function(data){
                //console.log(JSON.stringify(data)); //DEBUG
             
                //Clean the form to allow the user to create new markers
                $scope.addedLinks= [];
                $scope.marker = {};
                $scope.marker.latitude = "";
                $scope.marker.longitude = "";
        
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        
      

    };
    
 
    
    
   
}]);

app.controller('viewCtrl', function($scope, $http, $sce, gservice){
    var KEYCODE_ESC = 27;
    
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    
    //get current path
    var path = window.location.href;
    getBaseUrl();
    path = path.replace( BASE_URL + '/maps/', '');
    
    
    //initialize variables
    $scope.map = {};
    $scope.map.markers = []; 
    $scope.map._id ="";
    $scope.myarchive = []; //also include myarchive for post request
    $scope.modal = {};
    $scope.modal.links = [];
    $scope.modal.title = "";
    $scope.modal.description = "";
    $scope.editMarker = {};
    
    //refresh markers method
        var refreshMarkerData = function(){

            $http.get('../db/path/'+ path)
            .success(function(data){
                //console.log(JSON.stringify(data)); //DEBUG
               $scope.map._id = data._id;
               $scope.map.markers = data.markers;
               $scope.map = data; 
                $scope.myarchive = data.myarchive;


            })
            .error(function(data) {
                console.log('Error: ' + data);
            });


        };
    
    //initialize map
    refreshMarkerData();
    gservice.refresh(36.1627, -86.7816);
    
        $scope.viewMarker = function(marker){
            $scope.modal.links = marker.media;
            $scope.modal.title = marker.title;
            $scope.modal.description = marker.description;
            console.log($scope.modal.title);
            console.log($scope.modal.links);
            $('#marker_hider').show();
            $('#marker_popup_box').show();
             var document_height = $( document ).height();
            $("#marker_hider").css('height', document_height);




        }


        $("#marker_hider").on('click', function(){

            closeModal();

        })

        //on click hide the modal and return original view
        $("#marker_buttonClose").click(function () {

            closeModal();

        });
        //on escape key, close the modal
        $(document).keyup(function(e) {
            if (e.keyCode == KEYCODE_ESC) {

                closeModal();
            }
        });

        //close the modal by hiding the hider div and modal box, then showing the page content again
        var closeModal = function(){
            $("#marker_hider").fadeOut("slow");
            $('#marker_popup_box').fadeOut("slow");



        }




        //succint refresh markers with maps reload
        var refreshMarkers = function(){

            $http.get('../db/path/'+ path)
            .success(function(data){
               // console.log(JSON.stringify(data));
               $scope.map.id = data._id;
               $scope.map.markers = data.markers;
                $scope.map.myarchive = data.myarchive;
               $scope.map = data; 

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

            gservice.refresh(36.1627, -86.7816); //reload map with marker data

        };

   
        $scope.openWindow = function(lat, long){
            gservice.popUpMarker(lat, long);

        };
    

        $scope.closeMenu = function(){
        
            $("#view-menu-top").hide();
            $('#close-menu-Btn').hide();
            $('#open-menu-Btn').show();
            $('#map').css('height', '100vh');

        }
        
        $scope.openMenu = function(){
        
            $("#view-menu-top").show();
            $('#close-menu-Btn').show();
            $('#open-menu-Btn').hide();
            $('#map').css('height', '70vh');

        }

});

    
//Markers view controller
app.controller('markersCtrl', function($scope, $http, $sce, gservice){
    var KEYCODE_ESC = 27;
    
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    
    //get current path
    var path = window.location.href;
    getBaseUrl();
    path = path.replace(BASE_URL + '/edit/', '');
    
    
    //initialize variables
    $scope.map = {};
    $scope.map.markers = []; 
    $scope.map._id ="";
    $scope.myarchive = []; //also include myarchive for post request
    $scope.modal = {};
    $scope.modal.links = [];
    $scope.modal.title = "";
    $scope.modal.description = "";
    $scope.editMarker = {};
    
    //refresh markers method
    var refreshMarkerData = function(){
        
        $http.get('../db/path/'+ path)
        .success(function(data){
            //console.log(JSON.stringify(data)); //DEBUG
           $scope.map._id = data._id;
           $scope.map.markers = data.markers;
           $scope.map = data; 
            $scope.myarchive = data.myarchive;
            
           
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
       
        $http.get('../db/'+  $scope.map.id )
        .success(function(data){
         
            $scope.map.markers = data.markers;
            $scope.map = data; 
            //console.log($scope.map.markers);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    
    };
    
    //initialize map
    refreshMarkerData();
    gservice.refresh(36.1627, -86.7816);
    
    $scope.viewMarker = function(marker){
        $scope.modal.links = marker.media;
        $scope.modal.title = marker.title;
        $scope.modal.description = marker.description;
        console.log($scope.modal.title);
        console.log($scope.modal.links);
        $('#marker_hider').show();
        $('#marker_popup_box').show();
         var document_height = $( document ).height();
        $("#marker_hider").css('height', document_height);
       
        
    
    
    }
    
    
    $("#marker_hider").on('click', function(){
    
        closeModal();
    
    })
    
    //on click hide the modal and return original view
    $("#marker_buttonClose").click(function () {

        closeModal();

    });
    //on escape key, close the modal
    $(document).keyup(function(e) {
        if (e.keyCode == KEYCODE_ESC) {

            closeModal();
        }
    });

    //close the modal by hiding the hider div and modal box, then showing the page content again
    var closeModal = function(){
        $("#marker_hider").fadeOut("slow");
        $('#marker_popup_box').fadeOut("slow");
       


    }


    
    
    //succint refresh markers with maps reload
    var refreshMarkers = function(){
        
        $http.get('../db/path/'+ path)
        .success(function(data){
           // console.log(JSON.stringify(data));
           $scope.map.id = data._id;
           $scope.map.markers = data.markers;
            $scope.map.myarchive = data.myarchive;
           $scope.map = data; 
           
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        
        gservice.refresh(36.1627, -86.7816); //reload map with marker data
    
    };
    
    //remove marker function
    $scope.removeMarker = function(marker) {
        console.log('removing' );
         if (confirm('Are you sure you want to delete this?')) { //delete if confirmed action
            //remove the record from array
            var order = 0;
            for( var i=0 ; i<$scope.map.markers.length;  i++) {
                
                if( $scope.map.markers[i]._id == marker) {
                    order = $scope.map.markers[i].order; 
                    $scope.map.markers.splice(i,1);
                    
                }
               
                    
                

            }
             //decrease order of all other elements
             for( var i=0 ; i<$scope.map.markers.length;  i++) {
                
                if( $scope.map.markers[i].order > order) {
                    $scope.map.markers[i].order =   $scope.map.markers[i].order - 1;
                   
                    
                }
               
                    
                

            }
             

            //post the archive
            $http.put('/db/'+ $scope.map._id, {myarchive: $scope.myarchive, markers: $scope.map.markers})
                .success(function(data){
                    console.log(JSON.stringify(data));
                    gservice.refresh(36.1627, -86.7816);
                    refreshMarkers(); //refresh markers after deletion
                    
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });


            
         }
    };
   
   
    
    //refresh all fields on load
    $("#marker-menu").load( function(){ 
        path = window.location.href;
        getBaseUrl();
        path = path.replace(BASE_URL + '/edit/', '');
         refreshMarkers()
         gservice.refresh(36.1627, -86.7816);
    });
    
    //refresh all fields on click
     $('#markers-button').on('click', function(){
          path = window.location.href;
         getBaseUrl();
        path = path.replace( BASE_URL + '/edit/', '');
         refreshMarkers()
         gservice.refresh(36.1627, -86.7816);
        
        
    });
    
    $scope.openWindow = function(lat, long){
        gservice.popUpMarker(lat, long);

    };
    
    
    $scope.swapLeft = function(marker){
            //swap the created at dates for the two markers
            
            var currentOrder = marker.order
            
            refreshMarkerData(); 
            //remove old markers from array and push the updated ones
            for( var i= $scope.map.markers.length-1; i>=0; i--) {
                    //find the marker with order-1 and change to current order
                     if( $scope.map.markers[i].order == (currentOrder-1)) {
                        console.log("changing" + $scope.map.markers[i]._id );
                        $scope.map.markers[i].order = currentOrder;
                    }
                
                    //change current order
                
                    if( $scope.map.markers[i]._id == marker._id) {
                        console.log("removing" + $scope.map.markers[i]._id );
                        $scope.map.markers[i].order = currentOrder-1;
                    }
            }
     
            $http.put('/db/'+ $scope.map._id, {myarchive: $scope.myarchive, markers: $scope.map.markers})
                    .success(function(data){
                        console.log(JSON.stringify(data));
                         //refresh
                        refreshMarkers();

                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

    }
    
    $scope.swapRight = function(marker){
            //swap the created at dates for the two markers
            
            var currentOrder = marker.order
            
            refreshMarkerData(); 
            //remove old markers from array and push the updated ones
            for( var i= $scope.map.markers.length-1; i>=0; i--) {
                   
                
                    //find the marker with order+1 and change to current order
                     if( $scope.map.markers[i].order == (currentOrder+1)) {
                        console.log("changing" + $scope.map.markers[i]._id );
                        $scope.map.markers[i].order = currentOrder;
                    }
                
                     //change current order
                        if( $scope.map.markers[i]._id == marker._id) {
                            console.log("changing" + $scope.map.markers[i]._id );
                            $scope.map.markers[i].order = currentOrder+1;
                        }
                
                

            }
     
            $http.put('/db/'+ $scope.map._id, {myarchive: $scope.myarchive, markers: $scope.map.markers})
                    .success(function(data){
                        console.log(JSON.stringify(data));
                         //refresh
                        refreshMarkers();

                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

    }
    
    
    //edit marker fields
 
    $scope.edit = function(marker){
        $scope.addedLinks = [];
        $('#edit_hider').show();
        $('#edit_popup_box').show();
         var document_height = $( document ).height();
        $("#edit_hider").css('height', document_height);
        $scope.editMarker = marker;
       
    };
    
    
    //on click hide the modal and return original view
    $("#edit_buttonClose").click(function () {

        closeEditModal();

    });
    //on escape key, close the modal
    $(document).keyup(function(e) {
        if (e.keyCode == KEYCODE_ESC) {
            closeEditModal();
        }
    });

    //close the modal by hiding the hider div and modal box, then showing the page content again
    var closeEditModal = function(){
        $("#edit_hider").fadeOut("slow");
        $('#edit_popup_box').fadeOut("slow");
       


    }
   
    $scope.updateMarker = function(){
    //find old marker and update fields
        refreshMarkerData();
        for(var i = 0; i< $scope.map.markers.length; i++){
            if($scope.map.markers[i]._id == $scope.editMarker._id){
                    //update fields
                    $scope.map.markers[i].title = $scope.editMarker.title;
                    $scope.map.markers[i].description = $scope.editMarker.description;
                    $scope.map.markers[i].media = $scope.editMarker.media;

            }
        
        
        }
 
    //post the marker
         $http.put('/db/'+ $scope.map._id, {myarchive: $scope.myarchive, markers: $scope.map.markers})
                    .success(function(data){
                        console.log(JSON.stringify(data));
                         //refresh
                        refreshMarkers();
                        closeEditModal();

                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

    
    
    
    
    
    }
    
    
    $scope.removeMedia  = function(link){
       if(confirm("Are you sure you want to remove this media?")){
            for(var i=0; i< $scope.editMarker.media.length; i++){
                if($scope.editMarker.media[i] == link){
                    $scope.editMarker.media.splice(i,1); 
                    $scope.editMarker.media.$apply();
                }

           }
       }
    
    
    }
    

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
    
    
    
    
    //filestack controller
    $scope.onSuccess = function (Blob){
        //console.log(Blob); //DEBUG
        $scope.files.push(Blob);  
        $scope.$apply();
        var lastFile = $scope.files[$scope.files.length - 1];
        //console.log(lastFile.url); //DEBUG
        var path = "" + lastFile.url;
        $scope.archive.url = path;
        
    };
    
    //selection html element controller
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
    
    
    //create archive
    $scope.createArchive = function(){
        
        //parse links according to type
        if($scope.type == 'youtube'){
            $scope.archive.url = youtubeLinkParse($scope.youtube);
            

        }else if($scope.type == 'spotify'){
            $scope.archive.url = spotifyLinkParse($scope.spotify);
        }
        
        //console.log($scope.meta); // DEBUG
        //console.log($scope.meta.split(',')); //DEBUG 
        $scope.archive.metadata = $scope.meta.split(',');
        //console.log($scope.archive.metadata); //DEBUG
        if(true){ //passes validations
            successMessage();
            
            $http.post('/archive', $scope.archive)
                .success(function(data){
                    //console.log(JSON.stringify(data)); //DEBUG
                    //Clean the form to allow the user to create new archives
                    $scope.archive = {};
                    $scope.youtube = "";
                    $scope.spotify ="";
                    $scope.meta="";
                    //console.log('save succesful'); //DEBUG

                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
       }
    };
    
    
    //upload success styling
    var successMessage = function(){
        $('#error-log').text('Upload Succesful!')
        $('#error-log').addClass('success');
        $('#error-log').fadeOut(1000);
    }

});


//edit controller for archive editing
app.controller('adminEditController', function($scope, $http){
    //instantiates scope variables
    $scope.archive = {}; //archive object to be put in db 
    $scope.archive.title = "";
    $scope.archive.descrption = "";
    $scope.archive.metadata = [];
    $scope.meta = "";
    
    //get current path location for which archive
    var path = window.location.href;
    getBaseUrl();
    path = path.replace( BASE_URL + '/pqw4ry/edit/', '');
         
    //refresh field data
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
    
    //initialize data
    refreshData(); 
    
    //trust source method for youtube and spotify errors
     $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
  
     //post archive to db 
     $scope.saveArchive = function(){
        $scope.archive.metadata = $scope.meta.split(','); //parse metadata string into an array
        $http.put('../../archive/'+ $scope.archive._id, {title: $scope.archive.title, description: $scope.archive.description, metadata: $scope.archive.metadata})
                .success(function(data){
                   
                    console.log(JSON.stringify(data));
                    getBaseUrl();
                    window.location.href =  BASE_URL + '/pqw4ry/'; //return to homepage
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

     
     
     
     }
    
    
    $scope.removeItem = function(archive) { //delete archive  
        if (confirm('Are you sure you want to delete this?')) { //delete if confirmed
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

//controller for admin archive table 
app.controller('admin-archive-Controller', function($scope, $http, $sce){
    //get current location
    var path = window.location.href;
    getBaseUrl();
    path = path.replace(  BASE_URL + '/pqw4ry/archive/', '');
    
    //initialize variables
    $scope.map = {};
    $scope.myarchive =[];
         
    //get from archive
    var refreshData = function(){
        $http.get('../../db/'+ path)
        .success(function(data){
           $scope.myarchive = data.myarchive;
         
           
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
       
    
    
    };
    
    //initialize data
    refreshData();
    
    //trust src for youtibe and spotify urls
     $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    
    
     //array to string method
    $scope.arrayToString = function(meta){
        return meta.toString();
    
    }
    


});


//controller for admin markerds controller
app.controller('admin-markers-Controller', function($scope, $http, $sce){
    var path = window.location.href;
    getBaseUrl();
    path = path.replace( BASE_URL+'/pqw4ry/marker/', '');
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
    //array to string method
    $scope.arrayToString = function(links){
        return links.toString();
    
    }
    
    
    
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
        getBaseUrl();
        var url = BASE_URL + '/pqw4ry/archive/' + map
        window.location.href= url;
            

    };
    
    $scope.showMarkersTable = function(map){
        getBaseUrl();
        var url = BASE_URL + '/pqw4ry/marker/' + map
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

var getBaseUrl = function(){

    console.log('url is:  ' + window.location.href)
  if(window.location.href.includes('storyliner.org')){
        
        BASE_URL = 'http://storyliner.org'
     
     };
  
    



}








