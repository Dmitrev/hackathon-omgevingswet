(function($){
    $(function () {
        var wrapper = $('#wrapper');
        var animationSpeed = 500;

        $(document).on('slide.show', function(event){
            show(event.id);
        });

        function show(id){
            slideDown();
            $('.page').hide();
            $('#'+id).show();
            slideUp();
        }
        
        function slideDown() {
            wrapper.animate({
                bottom: '-45%'
            }, animationSpeed);
        }
        
        function slideUp() {
            wrapper.animate({
                bottom: 0
            }, animationSpeed);
        }
    
    });
})(jQuery);