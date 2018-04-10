var $ = require('../lib/jquery');

function music(){
    this.audio = new Audio()
    this.bind()
    this.audio.autoplay = true
    this.channelid = 'public_tuijian_rege'
    this.getmusic()
    console.log('music')
}

music.prototype = {
    bind:function(){
        var _this = this
        $('.icon-qianjin').on('click',function () {
            _this.getmusic()
        })

        $('.icon-houtui').on('click',function () {
            _this.getmusic()
        })


        $('.song-status').on('click',function () {
            if($(this).hasClass('icon-play')){
                $(this).removeClass('icon-play').addClass('icon-stop')
                _this.audio.play()
            }else{
                $(this).removeClass('icon-stop').addClass('icon-play')
                _this.audio.pause()
            }
        })

    },
    getmusic:function(){
        var _this = this
        $.ajax({
            url:'//jirenguapi.applinzi.com/fm/getSong.php',
            type:'GET',
            dataType:'json',
            data:{
                channel:_this.channelid
            }
        }).done(function (ret) {
            console.log(ret)
            if(ret.song[0].title ===null){
                return _this.getmusic()
            }
            _this.setMusic(ret.song[0])
        }).fail(function () {
            _this.loadMusic()
            console.log('404')
        })
    },
    setMusic:function (song) {
        var _this = this
        this.song = song
        this.audio.src = song.url
        $('.song-status').removeClass('icon-play').addClass('icon-stop')
    },





}


;

module.exports.music = music;