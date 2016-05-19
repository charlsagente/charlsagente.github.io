/**
 * Created by Charls on 19/05/2016.
 */

$(document).ready(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            //$("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
            $.ajax({
                method: "GET",
                url: "http://api.openweathermap.org/data/2.5/weather",
                data: { APPID: "8d71992a9fc0411860572517d49978ff", lat: position.coords.latitude,lon: position.coords.longitude }
            })
                .done(function( msg ) {
                    console.log( msg.weather[0].id );
                    $.getJSON( "js/mapping.json", function( data ) {

                        if(data.hasOwnProperty(msg.weather[0].id)){
                            $('#weather-icon').removeClass();
                            $('#weather-icon').addClass('wi customize-icons '+data[msg.weather[0].id]);

                        }
                        else{
                            $('#weather-icon').removeClass();
                            $('#weather-icon').addClass('wi customize-icons wi-day-sunny');
                        }
                    });
                    $('div span').text(msg.name+", "+msg.sys.country);

                });
        });
    }


});