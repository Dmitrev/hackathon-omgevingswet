$(function(){

    function trigger(id){
        var event = jQuery.Event( "slide.show" );
        event.id = id;
        $(document).trigger(event);
    }

    $(document).on('click', 'canvas', function(){
        trigger("main-category");
    });

    $('button[data-slide]').on('click', function () {
        var target = $(this).data('slide');
        trigger(target);
    })

    $('button[data-hide]').on('click', function () {
        $(document).trigger('slide.hide');
    })

});