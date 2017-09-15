var KEYCODE_ESC = 27; // for modal

//method that scrolls to create map mennu on click
$("#create-map-link").click(function() {
    $('html,body').animate({
        scrollTop: $("#create-map").offset().top},
        'slow');
});


//Modal controls
//hide hider and popup_box
$("#hider").hide(); //initially hidden modal
$("#popup_box").hide();

//on click show the hider div and the modal
$("#login-link").click(function () {
    $("#hider").fadeIn("slow");
    var document_height = $( document ).height();
     $("#hider").css('height', document_height);
    $('#popup_box').fadeIn("slow");
    $('#modalForm').show();
    $('#forgotPasswordForm').hide();
    //$('#content-page').fadeOut("slow");
    
            
});
//on click hide the modal and return original view
$("#buttonClose").click(function () {

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
    $("#hider").fadeOut("slow");
    $('#popup_box').fadeOut("slow");
    //$('#content-page').fadeIn("slow");


}


$('#forgot-password').on('click', function(){
    $('#modalForm').hide();
    $('#forgotPasswordForm').show();
    $("#error-login-forgot").text("");
    $("#error-login").text("");

});

$('#login').on('click', function(){
    $('#modalForm').show();
    $('#forgotPasswordForm').hide();
    $("#error-login-forgot").text("");
    $("#error-login").text("");

});
    

 function initMap() {
        var nashville = {lat: 36.1627, lng: -86.7816};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: nashville
        });
      }

initMap();

    
   
  
	








	

