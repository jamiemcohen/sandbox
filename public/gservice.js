angular.module('gservice', [])
    .factory('gservice', function($rootScope, $http){
        //INITIALIZE VARIABLES
        //___________________________________________________________________________
    
        //Service our factory will return
        var googleMapService = {};
    
    
        //locations garnered from API call
        var locations = [];
    
    
        //markers created
        var markers = [];
        
        var locations = [];
        //GLOBAL MAP = 
         var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: {lat: 36.1627, lng: -86.7816}
            }); 
    
        //selected location to start map at 
        var selectedLat = "36.1627";
        var selectedLong = "-86.7816";
        
        
        //FUNCTIONS
        //___________________________________________________________________________
        //pops up the corresponding marker window when given the lat and long coordinate
        googleMapService.popUpMarker = function(latitude, longitude){
            //find marker with those coordinates
            for(var i=0; i< markers.length; i++){
               var current = markers[i];
                
               // console.log('marker position :' +current.getPosition().lat() + ", " + current.getPosition().lng() );
                if(current.getPosition().lat() == latitude && current.getPosition().lng() == longitude){
                    //console.log('a match');
                    //close all locations
                   
                    for(var j=0; j< locations.length; j++){
                       var currentLoc = locations[j];
                        if(currentLoc.latlon.lat() == latitude && currentLoc.latlon.lng()== longitude){
                            //console.log('found a targetMatch');
                            closeWindows();
                            currentLoc.message.open(map, current);
                            map.panTo(currentLoc.latlon);

                        }

                    }
                    
                
                }
            
            }
            
             
            
            
            
            // open that marker
            
            
            
        };
        //refreshes map with new data. function will accept latitude and longitude parameters
        googleMapService.refresh = function(latitude, longitude){
            
            //clears holding array of locations
            locations = [];
        
            //update lat and long to given coordinates
            selectedLat = latitude;
            selectedLong = longitude;
        
            var path = getCurrentPath(window.location.href);
            
            //console.log(path);
            var id = "";
            $http.get('/db/path/'+ path)
                .success(function(data){
                    //console.log(JSON.stringify(data));
                    id = data._id;
                    var markers = data.markers;
                    locations = convertToMapPoints(data.markers);

                    // Then initialize the map.
                    initialize(latitude, longitude);
                    //console.log(markers);
                
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            
      
        
        
        };
    
    
    
        //PRIVATE INNER FUNCTIONS
        //___________________________________________________________________________
        //Close all open markers windows 
        var closeWindows = function(){
            for(var i = 0; i < locations.length; i++){
                var current = locations[i];
                current.message.close();    
            
            
            }
        
        
        
        };
        //Convert a JSON of points into map points
        var convertToMapPoints = function(response){
        
            locations = [];
            //loop through entries in response
            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var marker = response[i];
                if (typeof marker.description === "undefined") {
                    marker.description = "";
                }
                
                var  contentString =
                        '<p><b> ' + marker.title + '</b>' +
                        '<br>' + marker.description +
                        '</p>' ;
                var media = marker.media;
                var j = 0;
                var mediaString = "";
                while( j< media.length || media[j] != undefined){
                   
                    
                    var current = media[j];
                       // alert(marker.title + ' : ' + current + ' is a ' + typeof(current));
                        if(current != undefined || current != null){
                            if(current.includes('spotify')|| current.includes('youtube')){
                                mediaString += '<iframe src="'+ current +'" class= "media-thumbnail" frameborder="0" allowtransparency="true" allowFullScreen="allowFullScreen"></iframe><br>';

                            }

                            if(!current.includes('spotify') &&  !current.includes('youtube')){
                                mediaString += '<img src="'+ current +'" class= "img-thumbnail"><br>';

                               }
                        }
                        j++;
                    };
                

                    contentString = contentString +mediaString;       
                


                locations.push({
                        latlon: new google.maps.LatLng(marker.latitude, marker.longitude),
                        message: new google.maps.InfoWindow({
                            content: contentString,
                            maxWidth: 320
                        }),
                        title: marker.title,
                        description: marker.description,
                        links: marker.media

                 });    

                }
                return locations;


            

        
        };
    
        var getCurrentPath = function(path){
            if(path.includes('storyliner.org')){
                 if(path.includes('edit')){
                    path = path.replace('https://storyliner.org/edit/', '');
                }else if(path.includes('maps')){
                     path = path.replace('https://storyliner.org/maps/', '');
                }
            
            }else{
                if(path.includes('edit')){
                    path = path.replace('http://localhost:3000/edit/', '');
                }else if(path.includes('maps')){
                     path = path.replace('http://localhost:3000/maps/', '');
                }
        
            }
        
        
        
        
        }
    
        var initialize = function(latitude, longitude) {

        // Uses the selected lat, long as starting point
        var myLatLng = {lat: selectedLat, lng: selectedLong};

        // If map has not been created already...
       /* if (!map){

            // Create a new map and place in the index.html page
                var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: myLatLng
            });
        }*/

        // Loop through each location in the array and place a marker
        locations.forEach(function(n, i){
            var marker = new google.maps.Marker({
                position: n.latlon,
                map: map,
                title: "Big Map",
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            });
            markers.push(marker);
            //console.log(marker);
            // For each marker created, add a listener that checks for clicks
            google.maps.event.addListener(marker, 'click', function(e){

                // When clicked, open the selected marker's message
                currentSelectedMarker = n;
                n.message.open(map, marker);
            });
            
            
        });
            
        var currentMarker;
        google.maps.event.addListener(map, 'click', function(e){
                 placeMarker(e.latLng);
                // When double-clicked, add the info to lat and long fields
                    $('#latitude').val( e.latLng.lat());
                    $('#longitude').val( e.latLng.lng());
            
                
        });
            
            
         function placeMarker(location) {

             if (currentMarker == null)
             {
               currentMarker = new google.maps.Marker({
                  position: location,
                  map: map
                }); 
             } else {  
                currentMarker.setPosition(location); 
             } 
         };

        // Set initial location as a bouncing red marker
        /*var initialLocation = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({
            position: initialLocation,
            animation: google.maps.Animation.BOUNCE,
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });*/
        

    };

    google.maps.event.addDomListener(window, 'load',
    googleMapService.refresh(selectedLat, selectedLong));

    return googleMapService;


    
    
});
            
            
