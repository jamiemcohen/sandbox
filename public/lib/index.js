$("#create-map-link").click(function() {
    $('html,body').animate({
        scrollTop: $("#create-map").offset().top},
        'slow');
});
    

 function initMap() {
        var nashville = {lat: 36.1627, lng: -86.7816};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: nashville
        });
      }

initMap();

    
   
  
	








	

