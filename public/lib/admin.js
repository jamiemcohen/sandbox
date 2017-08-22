$('#manage-btn').on('click', function(){
    $("manage-btn").toggleClass("pure-menu-selected");
    $('#maps').hide();  
    $('#upload').hide();
    $('#manage').show();
                       
});

$('#upload-btn').on('click', function(){
    $("upload-btn").toggleClass("pure-menu-selected");
    $('#maps').hide();  
    $('#manage').hide();
    $('#upload').show();
                       
});

$('#map-btn').on('click', function(){
    $("map-btn").toggleClass("pure-menu-selected");
    $('#upload').hide();  
    $('#manage').hide();
    $('#maps').show();
                       
});


$('#state').change(function(){
    if($(this).val() == 'youtube'){
        $('#media-type-spotify').hide();
        $('#media-type-image').hide();
        $('#media-type-youtube').show();
    
    }
   if($(this).val() == 'spotify'){
        $('#media-type-spotify').show();
        $('#media-type-image').hide();
        $('#media-type-youtube').hide();

    
    }
    if($(this).val() == 'image'){
        $('#media-type-spotify').hide();
        $('#media-type-image').show();
        $('#media-type-youtube').hide();
    
    }


});



(function (window, document) {

    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink'),
        content  = document.getElementById('manage');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    function toggleAll(e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    }

    menuLink.onclick = function (e) {
        toggleAll(e);
    };

    content.onclick = function(e) {
        if (menu.className.indexOf('active') !== -1) {
            toggleAll(e);
        }
    };

}(this, this.document));




