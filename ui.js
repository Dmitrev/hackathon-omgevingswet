$(function(){

    var allowSlides = false;
    var key = {
      q: 81,
      esc: 27
    };

    $(document).on('keydown', function (e) {
        console.log(e.keyCode);

        if(e.keyCode === key.esc){
            $(document).trigger('slide.hide');
        }

       if(e.keyCode === key.q){
           allowSlides = true;
       }
    });

    function trigger(id){
        if( allowSlides ) {
            var event = jQuery.Event("slide.show");
            event.id = id;
            $(document).trigger(event);
        }
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