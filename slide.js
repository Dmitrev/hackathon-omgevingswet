(function($){
    $(function () {
        var wrapper = $('#wrapper');
        var animationSpeed = 500;
        var running = false;

        $(document).on('slide.show', function(event){
            show(event.id);
        });

        $(document).on('slide.hide', function(){
            slideDown();
        });

        function show(id){
            slideDown(function () {
                $('.page').hide();
                $('#'+id).show();
                slideUp();
            });

        }
        
        function slideDown(callback) {
            wrapper.animate({
                bottom: '-45%'
            }, animationSpeed, function () {
                if( typeof callback === 'function'){
                    callback();
                }
            });
        }
        
        function slideUp() {
            wrapper.animate({
                bottom: 0
            }, animationSpeed);
        }
    
    });
})(jQuery);