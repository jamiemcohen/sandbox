
var markerOpen = true;// markers menu open as default
var createOpen = false;
var uploadOpen = false;
var settingsOpen = false;
var archiveOpen = false;

$('#markers-button').click(function() {              
    
       openMarkersMenu();

                                
});
$('#create-button').click(function() {           
   
    if (createOpen == false){
        openCreateMenu();
        $('#map').hide();
    }else{
        closeCreateMenu();
        $('#map').show();
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
     hideAllMenusExcept("create");
    $(".create-menu").show();
    $("#create-button").css("background-color", "#F5A623");
    createOpen = true;
}


function closeCreateMenu(){
    $(".create-menu").hide();
    $("#create-button").css("background-color", "#E4E4E4");
    createOpen = false;


}

function openArchiveMenu(){
    $('#map').show();
    hideAllMenusExcept("archive"); 
    $(".archive-menu").show();
        $("#archive-button").css("background-color", "#F5A623");
        archiveOpen = true;

}

function closeArchiveMenu(){
    $(".archive-menu").hide();
    $("#archive-button").css("background-color", "#E4E4E4");
    archiveOpen = false;


}

function openUploadMenu(){
    $('#map').show();
    hideAllMenusExcept("upload"); 
    $(".upload-menu").show();
        $("#upload-button").css("background-color", "#F5A623");
        uploadOpen = true;

}

function closeUploadMenu(){
    $(".upload-menu").hide();
    $("#upload-button").css("background-color", "#E4E4E4");
    uploadOpen = false;


}

function openSettingsMenu(){
   $('#map').show();
    hideAllMenusExcept("settings"); 
    $(".settings-menu").show();
        $("#settings-button").css("background-color", "#F5A623");
        settingsOpen = true;

}

function closeSettingsMenu(){
    $(".settings-menu").hide();
    $("#settings-button").css("background-color", "#E4E4E4");
    settingsOpen = false;


}