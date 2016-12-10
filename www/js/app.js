$(document).ready(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
});


function onDeviceReady(){

    var channel = "pewdiepie";
    getPlaylist(channel);

    $(document).on('click', "#vidlist li", function (){
        showVideo($(this).attr("videoId"));
    })

}


function getPlaylist(channel){
    $("#vidlist").html('');
    $.get(
        "https://www.googleapis.com/youtube/v3/channels",
        {
            part: "contentDetails",
            forUsername: channel,
            key: "AIzaSyCJ6kw6PA0kVbunOoKxVRcTiH6wYhQl0Is"
        },
        function (data){
            $.each(data.items, function(i, item){
                console.log(item);
                var playlistid = item.contentDetails.relatedPlaylists.uploads;
                getVideos(playlistid, 10);
            });
        }
        );
}

function getVideos (id, numVids){
    $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems",
            {
                part: 'snippet',
                maxResults: numVids,
                playlistId: id,
                key: "AIzaSyCJ6kw6PA0kVbunOoKxVRcTiH6wYhQl0Is"
            }, function (data) {
                var output;
                $.each(data.items, function(i, item){
                    id = item.snippet.resourceId.videoId;
                    title = item.snippet.title;
                    thumb = item.snippet.thumbnails.default.url;
                    $("#vidlist").append('<li videoId="' + id + '"> <h3>' + title + '</h3> <br/> <img src="' + thumb + '" /> </li>');
                    $("#vidlist").listview('refresh');
                });
            }

        );
}

function showVideo(id){
    console.log("Showing Video: "+ id);
    $("#logo").hide();
    var output = '<iframe width="100%" height="315" src="https://www.youtube.com/embed/'+ id +'" frameborder="0" allowfullscreen></iframe>';
    $("#showVideo").html(output);



}

//  UU-lHJZR3Gqxm24_Vd_AJ5Yw