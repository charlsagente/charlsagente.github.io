/**
 * Created by Charls on 19/05/2016.
 */

$(document).ready(function () {

    var degrees=0;

    var host = "charlsagente.github.io";
    if ((host == window.location.host) && (window.location.protocol != "https:"))
        window.location.protocol = "https";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            $.ajax({
                method: "GET",
                url: "http://api.openweathermap.org/data/2.5/weather",
                data: {
                    APPID: "8d71992a9fc0411860572517d49978ff",
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                success: function (msg) {
                    console.log(msg.weather[0].id);
                    var idWeather=msg.weather[0].id;


                    if(idWeather>=200 && idWeather <=531)
                        $('#bg-container').addClass('site-wrapper bg-rainy');
                    else if(idWeather>=801 && idWeather <=962)
                        $('#bg-container').addClass('site-wrapper bg-clouds');
                    else if(idWeather==800)
                        $('#bg-container').addClass('site-wrapper bg-sunny');
                    else if(idWeather>=600 && idWeather<=622)
                        $('#bg-container').addClass('site-wrapper bg-snowy');
                    else
                        $('#bg-container').addClass('site-wrapper bg-foggy');



                    $.getJSON("js/mapping.json", function (data) {

                        if (data.hasOwnProperty(msg.weather[0].id)) {
                            $('#weather-icon').removeClass();
                            $('#weather-icon').addClass('wi customize-icons ' + data[msg.weather[0].id]);

                        }
                        else {
                            $('#weather-icon').removeClass();
                            $('#weather-icon').addClass('wi customize-icons wi-day-sunny');
                        }
                    });
                    var spans =
                        [
                            msg.weather[0].description,
                            msg.name + ", " + msg.sys.country,
                            ((msg.main.temp - 273.15) * 1.8 + 32).toFixed(2),
                            " <a href=\"#\">&deg; F</a>"

                        ]
                    degrees=spans[2];

                    $('div p span').each(function (index, element) {
                        $(element).html(spans[index]);

                    });
                },
                error: function (xhr, opts, error) {
                    alert("An error has ocurred, maybe https because security");
                    console.log(error);
                }
            })

        });
    }


    $('#conversion').click(function () {
        if($('#conversion').text().search("F")!==-1){
            var result= (parseFloat($('#temp').text())-32)/1.8;
            $('#temp').html(result.toFixed(2));
            $('#conversion').html("<a href=\"#\">&deg; C</a>")
        }
        else if($('#conversion').text().search("C")!==-1){
            var result= (parseFloat($('#temp').text()))*1.8+32;
            $('#temp').html(result.toFixed(2));
            $('#conversion').html("<a href=\"#\">&deg; F</a>")
        }
    });


});