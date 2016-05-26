/**
 * Created by Charls on 26/05/2016.
 */
$(document).ready(function(){

$("#searchclear").click(function(){
    $("#searchinput").val('');
});


        $.ajax({
            
            method:"POST",
            dataType: 'json',
            headers: {
                'Api-User-Agent': 'Example/1.0' ,
                'Access-Control-Allow-Origin': '*'
            },
            url: "https://en.wikipedia.org/w/api.php",
            data: {
                action:'query',
                prop:'revisions',
                rvprop:'rvprop',
                format:'json',
                titles: $("#searchinput").val(),


            },

            success: function (msg) {
                console.log(msg.weather[0].id);


            },
            error: function (xhr, opts, error) {
                alert("An error has ocurred, maybe https because security");
                console.log(error);
            }
        })

});