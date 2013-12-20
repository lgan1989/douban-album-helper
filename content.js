


$(document).ready(function(){


    $('body').append('<audio id="player" src="" ></audio>');
    $('.song-item').find('.song-name').append("<div class='play' style='color:#16a085;float:right;'>Play</div><div class='share' style='margin-right:20px;color:#3498db;float:right;'>Share</div> ");
    var aud = $('#player')[0];
    var currentId = '';

    var shareLinkBase = "http://service.weibo.com/share/share.php?appkey=3163308509&";
    $('.play').hover(function(){
        $(this).css('color' , '#1abc9c');
    },
        function(){
        $(this).css('color' , '#16a085');
        }
    );
    function q(){return{left:(screen.width-600)/2,top:(screen.height-500)/2}}  
    function share ( target ){
        var sid = target.attr('id');
        var ssid = target.attr('data-ssid');
        var title = target.find('.song-name').attr('data-title');
        var mp3Url = 'http://douban.fm/?start='+sid+'g' + ssid+'g';       
        var artist = target.find('.singer').attr('value');
        var imgUrl = $('#mainpic').find('img').attr('src');
        var shareLink = shareLinkBase + 'url=' + encodeURI(mp3Url) + '&title=' + encodeURI('分享一首' + artist + '的' + title + '. via douban.fm') + '&pic=' + encodeURI(imgUrl);
        var z = q();
        window.open(shareLink, "mb", ["toolbar=0,status=0,resizable=1,width=440,height=430,left=", z.left, ",top=", z.top].join(""))
    }

    function play( target ){

        var sid = target.attr('id');
        var ssid = target.attr('data-ssid');
        var obj = target;
        
        currentId = sid;
        var url = 'http://ganlu.name/me/dial/get'; 
        var mp3Url = 'http://douban.fm/?start='+sid+'g' + ssid+'g';
        $.ajax({
            url: url,
            data: {url : mp3Url},
            type: "POST",
            dataType: "json",
            success: function (data) {
                aud.setAttribute('src', data.url); 
                if (currentId != ''){
                    obj.find('.play').html('play');
                }
                obj.find('.play').html('Pause');
                aud.play();  
            }
        });                 
    }

    $("#player").bind("ended", function(){
        $('#' + currentId).find('.play').html('Play');
        play( $('#' + currentId).next() );
    }); 
    
    $('.share').click(function(){
        var obj = $(this).parents('li');
        share(obj);
    });

    $('.play').click(function(){
        var obj = $(this).parents('li');
        if (obj.find('.play').html() == 'Play'){
            if (currentId == obj.attr('id')){
                obj.find('.play').html('Pause');
                aud.play();
            }
            else{
                $('#' + currentId).find('.play').html('Play');
                play(obj);
            }
        }
        else{
            obj.find('.play').html('Play');
            aud.pause();
        }
    });

  

});
