var markerOpen = true;// markers menu open as default
var createOpen = false;
var uploadOpen = false;
var settingsOpen = false;
var archiveOpen = false;


$('#header-close-button').click(function() {              
    $('#menu-top').css('display', 'none'); 
    $('#archive-button').css('background-color', '#E4E4E4');
     $('#archive-button').css('color', 'black');
});



$('#markers-button').click(function() {              
    
    if (markerOpen == false){
        openMarkersMenu();
    } else{
        closeMarkersMenu();
        
    }
        
                                
});
$('#create-button').click(function() {           
   
    if (createOpen == false){
        openCreateMenu();
        $('#map').hide();
        $('#mapLocator').show();
    }else{
        closeCreateMenu();
        $('#map').show();
        $('#mapLocator').hide();
        openMarkersMenu();
    }
                                
});

$('#archive-button').click(function() {           
   
    if (archiveOpen == false){
        openArchiveMenu();
    }else{
        closeArchiveMenu();
        openMarkersMenu();
    }
                                
});

$('#upload-button').click(function() {           
   
    if (uploadOpen == false){
        openUploadMenu();
    }else{
        closeUploadMenu();
        openMarkersMenu();
    }
                                
});
$('#settings-button').click(function() {           
   
    if (settingsOpen == false){
        openSettingsMenu();
    }else{
        closeSettingsMenu();
        openMarkersMenu();
    }
                                
});



function hideAllMenusExcept(menu){
    if(menu != "markers"){
        closeMarkersMenu();
    }
    if(menu != "create"){
        closeCreateMenu();
    }
    if(menu != "archive"){
        closeArchiveMenu();
    }
    if(menu != "upload"){
        closeUploadMenu();
    }
    if(menu != "settings"){
        closeSettingsMenu();
    }
    

}

function openMarkersMenu(){
    hideAllMenusExcept("markers"); 
    $('#menu-top').show();
    $('#menu-top').css('height', '50vh');
    $('#map').show();
    $(".marker-menu").show();
        $("#markers-button").css("background-color", "#F5A623");
        markerOpen = true;

}

function closeMarkersMenu(){
     $(".marker-menu").hide();
     $("#markers-button").css("background-color", "#E4E4E4");
        markerOpen = false;

}

function openCreateMenu(){
    $('#header-close-button').hide();
     hideAllMenusExcept("create");
    $('#menu-top').show();
    $('#menu-top').css('width', '40%');
    $(".create-menu").show();
    $("#create-button").css("background-color", "#F5A623");
    createOpen = true;
}


function closeCreateMenu(){
     $('#header-close-button').show();
     $('#menu-top').css('width', '100%');
    $(".create-menu").hide();
    $("#create-button").css("background-color", "#E4E4E4");
    createOpen = false;


}

function openArchiveMenu(){
    $('#menu-top').show();
    $('#map').show(); 
    hideAllMenusExcept("archive"); 
    $('#archive-button').css('color', 'white');
    $('#menu-top').css('height', '100vh');
    $('#menu-top').css("background-color", "black");
    $()
    $(".archive-menu").show();
        $("#archive-button").css("background-color", "black");
        archiveOpen = true;

}

function closeArchiveMenu(){
    $('#menu-top').css('height', '40vh');
    $('#menu-top').css("background-color", "#F5A623");
    $('#archive-button').css('color', 'black');
    $(".archive-menu").hide();
    $("#archive-button").css("background-color", "#E4E4E4");
    archiveOpen = false;


}

function openUploadMenu(){
    
    $('#menu-top').show();
    $('#map').show();
    hideAllMenusExcept("upload");
    $('#menu-top').css('height', '70vh');
    $(".upload-menu").show();
        $("#upload-button").css("background-color", "#F5A623");
        uploadOpen = true;

}

function closeUploadMenu(){
   
    $(".upload-menu").hide();
    $('#menu-top').css('height', '40vh');
    $("#upload-button").css("background-color", "#E4E4E4");
    uploadOpen = false;


}

function openSettingsMenu(){
    $('#menu-top').show();
   $('#map').show();
    hideAllMenusExcept("settings"); 
    $(".settings-menu").show();
        $("#settings-button").css("background-color", "#F5A623");
        settingsOpen = true;

}

function closeSettingsMenu(){
    $('#menu-top').show();
    $(".settings-menu").hide();
    $("#settings-button").css("background-color", "#E4E4E4");
    settingsOpen = false;


}


//-------------UPLOAD-MENU CONTROLS--------------------

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function toggleUploadMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

$('#youtube').click(function(){
    $('#media-type-spotify').hide();
    $('#media-type-image').hide();
    $('#media-type-youtube').show();
    $('.dropbtn').html('Youtube Link  ˇ ');
    

});

$('#spotify').click(function(){
    $('#media-type-spotify').show();
    $('#media-type-image').hide();
    $('#media-type-youtube').hide();
    $('.dropbtn').html('Spotify Link  ˇ ');
});

$('#image').click(function(){
    $('#media-type-spotify').hide();
    $('#media-type-image').show();
    $('#media-type-youtube').hide();
    $('.dropbtn').html('Upload Image  ˇ ');
});




//-------------MARKERS MENU CONTROLS---------------------------

//-------------CREATE MENU CONTROLS---------------------------


