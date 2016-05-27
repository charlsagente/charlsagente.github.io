/**
 * Created by Charls on 26/05/2016.
 */
$(document).ready(function(){

    $("#searchclear").click(function() {

        $('.list-group').addClass('animated bounceOutDown');
        $('.list-group').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $('.list-group').removeClass('animated bounceOutDown');
            $("#searchinput").val('');
            $("#searchinput").focus();
            $(".list-group").empty();

        });


    });

    $("#searchinput").keyup(function (e) {
        if (e.keyCode == 13) {

            $.ajax({

                method:"GET",
                dataType: 'jsonp',
                jsonp: "callback",
                headers: {

                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Api-User-Agent': 'Example/1.0'

                },
                url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=JSON_CALLBACK&gsrsearch="+encodeURI($("#searchinput").val()),

                success: function (msg) {
                    

                    $( ".list-group" ).empty();

                    $.each(msg.query.pages,function(index, jsonelement){

                        $( "<a>" ,
                            {href:'https://en.wikipedia.org/?curid='+jsonelement.pageid,
                                target:'_blank',
                                class:'list-group-item'
                            }).append(

                            $("<h4>",{
                                text:jsonelement.title,
                                class:'list-group-item-heading'

                            }),
                            $("<p>",{
                                text:jsonelement.extract,
                                class:'list-group-item-text'
                            })
                        ).appendTo('.list-group');

                        $('<br>').appendTo('.list-group');



                    });

                    $('.list-group').addClass('animated bounceInUp');
                    $('.list-group').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                        $('.list-group').removeClass('animated bounceInUp');
                    });



                },
                error: function (xhr, opts, error) {
                    alert("An error has ocurred, maybe https because security");
                    console.log(error);
                }
            });
        }
    });




});