$(document).ready(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
});


function onDeviceReady(){

    //check LocalStorage for channel
    if (localStorage.channel == null || localStorage.channel == ''){
        $("#popupDialog").popup('open');
    } else {
        var channel = localStorage.getItem('channel');
    }

    if (localStorage.getItem('maxresults') == ''){
        localStorage.setItem('maxresults', 10);
    }
    //var channel = "pewdiepie";
    getPlaylist(channel);

    $(document).on('click', "#vidlist li", function (){
        showVideo($(this).attr("videoId"));
    });

    $("#channelBtnOK").click(function(){
        var channel = $("#channelName").val();
        setChannel(channel);
        getPlaylist(channel);
        populateInputs();

    });

    $("#saveOptions").click(function(){
        saveOptions();
    });

    $("#clearChannel").click(function(){
        clearChannel();
    });

    $(document).on('pageinit', '#options', populateInputs);

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
                getVideos(playlistid, localStorage.getItem('maxresults'));
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


function setChannel(channel){

    localStorage.setItem('channel',channel);
    console.log('Channel Set: ' + channel);

}


function saveOptions (){
    var channel = $("#channelNameOptions").val();
    setChannel(channel);

    var maxResults = $("#maxResultsOptions").val();
    setMaxResults(maxResults);

    $('body').pagecontainer('change', '#main', {options});

    getPlaylist(channel);

}

function setMaxResults(maxResults){
    localStorage.setItem('maxresults', maxResults);
    console.log('Max Results: ' + maxResults);
}

function clearChannel(){
    localStorage.removeItem('channel');
    $('body').pagecontainer('change', '#main', {options});
    $('#showVideo').html('');
    $('#logo').show();
    $('#vidlist').html('');
    $('#popupDialog').popup('open');
}

function populateInputs (){
    var channel = localStorage.getItem('channel');
    var maxResults = localStorage.getItem('maxresults');
    $('#channelNameOptions').attr('value', channel);
    $('#maxResultsOptions').attr('value', maxResults);
}







//  UU-lHJZR3Gqxm24_Vd_AJ5Yw