//toggle tracking
var markerOpen = false;
var archiveOpen = false;
var uploadOpen = false;
var settingsOpen = false;


$("#markers-button").click(function(){
    if (markerOpen == false){
        $(".marker-menu").show();
        $("#markers-button").css("background-color", "#F5A623");
        markerOpen = true;
    }else{
         $(".marker-menu").hide();
         $("#markers-button").css("background-color", "#E4E4E4");
        markerOpen = false;
    }
});




