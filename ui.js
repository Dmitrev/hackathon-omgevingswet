$(function(){

    var allowSlides = false;
    var key = {
      esc: 27
    };

    var cardTemplate =
        '<div class="col-sm-4">'+
        '<div class="card" data-slide="check" data-option="{index}">' +
        '<div class="card-body">{text}</div>' +
        '</div>'+
        '</div>';

    $(document).on('keydown', function (e) {
        console.log(e.keyCode);

        if(e.keyCode === key.esc){
            $(document).trigger('slide.hide');
        }
    });

    function trigger(id){
            var event = jQuery.Event("slide.show");
            event.id = id;
            $(document).trigger(event);
    }

    $(document).on('click', '[data-slide]', function () {
        // If category button is clicked
        if( typeof $(this).attr('data-category') === 'string' ){
            setCategory(this);
        }

        if( typeof $(this).attr('data-option') === 'string' ) {
            option = $(this).attr('data-option');
        }
        var target = $(this).data('slide');
        trigger(target);
    });

    $('[data-hide]').on('click', function () {
        $(document).trigger('slide.hide');
    });

    function setCategory(el) {
        category = $(el).attr('data-category');
        var optionIndexes = categories[category];
        var html = '';

        optionIndexes.forEach(function(value, index){
            var optionName = options[value];
            var optionTemplate = cardTemplate;
            optionTemplate = optionTemplate.replace("{index}", value);
            optionTemplate = optionTemplate.replace("{text}", optionName);
            html += optionTemplate;
        });

        $('#option').find('.row').html(html);
    }



});