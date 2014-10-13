window.attachEvent("onload", function(){
    var children = $('body').children();
    for( var i = 0; i < children.length; i++ ) {
        var c = $(children[i]);

        if( c.hasClass('ie-error') ) c.css('display', 'block');
        else c.css('display', 'none');
    }
});