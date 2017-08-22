angular.module('gservice', [])
    .factory('gservice', function($rootScope, $http){
        //INITIALIZE VARIABLES
        //___________________________________________________________________________
    
        //Service our factory will return
        var googleMapService = {};
    
    
        //locations garnered from API call
        var locations = [];
    
    
        //selected location to start map at 
        var selectedLat = "36.1627";
        var selectedLong = "-86.7816";
    
        
    
        //FUNCTIONS
        //___________________________________________________________________________
        //refreshes map with new data. function will accept latitude and longitude parameters
        googleMapService.refresh = function(latitude, longitude){
            
            //clears holding array of locations
            locations = [];
        
            //update lat and long to given coordinates
            selectedLat = latitude;
            selectedLong = longitude;
        
            
            //perform an ajax call to get all the current markers
            $http.get('/marker').success(function(response){

                // Convert the results into Google Map Format
                locations = convertToMapPoints(response);

                // Then initialize the map.
                initialize(latitude, longitude);
            }).error(function(data) {
            console.log('Error: ' + data);
            
            });
        
        
        };
    
    
    
        //PRIVATE INNER FUNCTIONS
        //___________________________________________________________________________
        //Convert a JSON of points into map points
        var convertToMapPoints = function(response){
        
            var locations = [];
            
            //loop through entries in response
            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var marker = response[i];
          
            
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
                                mediaString += '<iframe src="'+ current +'" class= "media-thumbnail" frameborder="0" allowtransparency="true"></iframe><br>';

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
    
        var initialize = function(latitude, longitude) {

        // Uses the selected lat, long as starting point
        var myLatLng = {lat: selectedLat, lng: selectedLong};

        // If map has not been created already...
        if (!map){

            // Create a new map and place in the index.html page
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: myLatLng
            });
        }

        // Loop through each location in the array and place a marker
        locations.forEach(function(n, i){
            var marker = new google.maps.Marker({
                position: n.latlon,
                map: map,
                title: "Big Map",
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            });

            // For each marker created, add a listener that checks for clicks
            google.maps.event.addListener(marker, 'click', function(e){

                // When clicked, open the selected marker's message
                currentSelectedMarker = n;
                n.message.open(map, marker);
            });
        });

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
            
            
