$(document).ready(function(){

    // Load Fonts
    WebFont.load({
        google: {
            families: ['Titillium Web']
        }
    });

    // Menu Mobile
    $('.btn-toggle-menu').click(function(e) {
        
        e.preventDefault();
        
        $('.toggle-menu').slideToggle();
    });
 });