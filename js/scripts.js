$(document).ready(function(){
    var host = "charlsagente.github.io";
    if ((host == window.location.host) && (window.location.protocol != "https:"))
        window.location.protocol = "https";


$("#navbar ul li a[href^='#']").on('click', function(e) {

   // prevent default anchor click behavior
   e.preventDefault();

   // store hash
   var hash = this.hash;

   // animate
   $('html, body').animate({
       scrollTop: $(hash).offset().top
     }, 300, function(){

       // when done, add hash to url
       // (default click behaviour)
       window.location.hash = hash;
     });

});

    $(".progress-bar").animate({
        width: "70%"
    }, 2500);
});