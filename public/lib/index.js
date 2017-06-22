

//$( document ).ready( function() {
	var markers = [], // an array containing all the markers added to the map
		markersCount = 0; // the number of the added markers
    
    
    var initMap = function () {
		// create a map in the "map" div, set the view to a given place and zoom
	   map = new L.Map( 'map', { zoomControl: true } ).setView( [ 36.1627, -86.7816 ], 15 );

	    // add a tile layer
	    L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	    }).addTo( map );
        
        map.on('dblclick', function(e){
            addMarker(e);
        });

    
	}
    

    function addMarker(e){
        // Add marker to map at click location; add popup window
        markers[markersCount] = new L.marker(e.latlng,{
            draggable: true
        
        }).addTo(map);
            
        markersCount++;
    };
   
 
	initMap();
	
//});
