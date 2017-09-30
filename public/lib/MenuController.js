var markerOpen = true;// markers menu open as default
var createOpen = false;
var uploadOpen = false;
var settingsOpen = false;
var archiveOpen = false;


$('#header-close-button').click(function() {              
    $('#menu-top').css('display', 'none'); 
     $('#map').css('width', '100%');
    $('#map').css('height', '100vh');
});

$('#view-header-close-button').click(function() {              
    $('#menu-top').hide(); 
     $('#view-header').show();
     $('#map').css('width', '100%');
    $('#map').css('height', '100vh');
   
    
});

$('#view-header-view-button').click(function() {              
    $('#menu-top').show();
     $('#view-header').hide();
     $('#map').css('width', '100%');
    $('#map').css('height', '60vh');
   
});




$('#markers-button').click(function() {              
    
    if (markerOpen == false){
        openMarkersMenu();
        $('#map').css('width', '100%');
        $('#map').css('height', '60vh');
    } else{
        closeMarkersMenu();
        
    }
        
                                
});
$('#create-button').click(function() {           
   
    if (createOpen == false){
        openCreateMenu();
        $('#map').css('width', '60%');
        $('#map').css('height', '100vh');
    }else{
        closeCreateMenu();
        $('#map').css('width', '100%');
        $('#map').css('height', '60vh');
        
        openMarkersMenu();
    }
                                
});

$('#archive-button').click(function() {           
   
    if (archiveOpen == false){
        openArchiveMenu();
        $('#map').hide();
    }else{
        closeArchiveMenu();
        openMarkersMenu();
        $('#map').show();
        $('#map').css('width', '100%');
        $('#map').css('height', '60vh');
    }
                                
});

$('#upload-button').click(function() {           
   
    if (uploadOpen == false){
        openUploadMenu();
        $('#map').css('width', '100%');
        $('#map').css('height', '60vh');
    }else{
        closeUploadMenu();
        openMarkersMenu();
    }
                                
});
$('#settings-button').click(function() {           
   var path = window.location.href;
   if(path.contains('localhost')){
    path = path.replace('http://localhost:3000/edit', 'http://localhost:3000/maps');
   }else{
     path = path.replace('https://storyliner.org/edit', 'http://storyliner.org/maps');
   }
    window.open(path, '_blank');
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
    $('#menu-top').css('height', '40vh');
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
  
    hideAllMenusExcept("archive"); 
    $('#archive-button').css('color', 'white');
    $('#menu-top').css('height', '100vh');
    $('#menu-top').css("background-color", "black");
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
    $('#map').show(); 
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

$('#addMedia-btn').on('click', function(){
    $('#archive-panel').toggle();
    $('#create-form').toggle();
});

$('#addMedia-btn-back').click(function(){
    $('#archive-panel').toggle();
    $('#create-form').toggle();

});

$('#addMedia-btn-myarchive').on('click',function(){
    $('#media-scrollable-myarchive').toggle();
    $('#media-scrollable-sandbox').toggle();

});

$('#addMedia-btn-sandbox').on('click', function(){
    $('#media-scrollable-myarchive').toggle();
    $('#media-scrollable-sandbox').toggle();

});


//-------------ARCHIVE MENU CONTROLS---------------------------


$('#myarchive-btn').click(function(){
   $('#myarchive-btn').css("background-color", "white"); 
    $('#sandbox-btn').css("background-color", "#333333");
    $('#myarchive-menu').show();
    $('#sandbox-menu').hide();
});

$('#sandbox-btn').click(function(){
   $('#sandbox-btn').css("background-color", "white");
    $('#myarchive-btn').css("background-color", "#333333");
    $('#myarchive-menu').hide();
    $('#sandbox-menu').show();
    
});


