/**
 * Created by Charls on 19/05/2016.
 */

$(document).ready(function(){

    $.ajax({
    method: "GET",
    url: "api.openweathermap.org/data/2.5/weather",
    data: { APPID: "8d71992a9fc0411860572517d49978ff", lat: "35",lon:"139" }
    })
    .done(function( msg ) {
        alert( "Data Saved: " + msg );
    });

});