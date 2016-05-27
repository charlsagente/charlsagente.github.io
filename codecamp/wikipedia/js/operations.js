/**
 * Created by Charls on 26/05/2016.
 */
$(document).ready(function(){

$("#searchclear").click(function(){
    $("#searchinput").val('');
});


        $.ajax({

            method:"POST",
            dataType: 'jsonp',
            jsonp: "callback",
            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Api-User-Agent': 'Example/1.0'

            },
            url: "https://en.wikipedia.org/w/api.php?action=query&titles=Racism&prop=revisions&rvprop=content&format=jsonfm",
            data: {
                action: "query",
                list: "search",
                srsearch: "javascript",
                format: "json"
            },


            success: function (msg) {
                console.log(msg);


            },
            error: function (xhr, opts, error) {
                alert("An error has ocurred, maybe https because security");
                console.log(error);
            }
        })

});