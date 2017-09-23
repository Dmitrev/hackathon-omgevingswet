$(function(){

    var allowSlides = false;
    var key = {
      q: 81,
      esc: 27
    };

    var cardTemplate =
        '<div class="col-sm-4">'+
        '<div class="card" data-slide="option" data-category="{index}">' +
        '<div class="card-body">{text}</div>' +
        '</div>'+
        '</div>';

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

    $('[data-slide]').on('click', function () {
        // If category button is clicked
        if( typeof $(this).attr('data-category') === 'string'){
            category = $(this).attr('data-category');

            console.log(categories[category]);

        }
        var target = $(this).data('slide');
        trigger(target);
    });

    $('[data-hide]').on('click', function () {
        $(document).trigger('slide.hide');
    });

A

});