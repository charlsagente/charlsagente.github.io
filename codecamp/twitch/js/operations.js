/**
 * Created by Charls on 01/06/2016.
 */
$(document).ready(function() {

    var channels = ["ESL_SC2","OgamingSC2","cretetion","charlsagente","freecodecamp","storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","customer404"];
    var showdata={'rows':[]};

    apiQuery("https://api.twitch.tv/kraken/streams?channel="+channels.join(","), function(msg){

        var online = [];
        $.each(msg.streams,function(index,val){
            online.push(val.channel.display_name);
            var temprow = {
                'display_name':val.channel.display_name,
                'status':val.channel.status,
                'class':'success',
                'logo':val.channel.logo,
                'url':"<a href=\""+val.channel.url+"\">Link<a/>",
                'game':val.game
            }
            showdata.rows.push(temprow);
        });

        var diff = $(channels).not(online).get();

        $.each(diff,function(index,val){
           apiQuery("https://api.twitch.tv/kraken/channels/"+val,function(response){

               if (response==="Not Found")
                showdata.rows.push({
                    'display_name':val,
                    'url':'<a href="charlsagente.github.io/404">Link</a>',
                    'class':'danger',
                    'logo':'img/default.png',
                    'game':"account closed",
                    'status':''
                });
               else{
                   showdata.rows.push({
                       'display_name':response.display_name,
                       'class':'active',
                       'logo':(response.logo)? response.logo : 'img/default.png',
                       'url':"<a href=\""+response.url+"\">Link<a/>",
                       'status':'',
                       'game':"offline",
                   });
               }
           });
        });

        $.each(showdata.rows,function(index,val){

            $("<tr>",{class:val.class}).append(
                $("<td>",{
                    text: (val.display_name)? val.display_name : "default"
                }),
                $("<td>",{
                        html:"<img class=\"img-responsive img-thumbnail\" src=\""+val.logo+"\"> </img>",
                        width:"60px"
                    }),
                $("<td>",{
                    html:val.url
                }),
                $("<td>",{
                    text:(val.game)? val.status: ""
                }),
                $("<td>",{
                    text:(val.game)? val.game: ""
                })
            ).appendTo("tbody");
        });

    });

    function apiQuery(url,callback){

        $.ajax({
            method:"GET",
            async:false,
            headers: {
                'Accept': 'application/json'
            },
            url: url,//"https://api.twitch.tv/kraken/streams?channel=ESL_SC2,OgamingSC2,cretetion,freecodecamp",
            success: function (msg) {
                return callback(msg);
            },
            error: function (xhr, opts, error) {
                //alert("An error has ocurred, maybe https because security");
                return callback(error);
            }
        });
    }
});