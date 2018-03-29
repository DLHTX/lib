require('less/carousel.less')
var $ = require('../lib/jquery')
function carousel(node) {
    this.init(node)
    this.bind()
    this.autoplay()

}

carousel.prototype = {
    init : function (node) {
        this.$carousel  = node
        this.btnNext = this.$carousel.find('.icon-next')
        this.btnLast = this.$carousel.find('.icon-last')
        this.$ul =  this.$carousel.find('ul')
        this.$img =  this.$carousel.find('img')
        this.$ul.append(this.$img.first().clone())
        this.$ul.prepend(this.$img.last().clone())
        this.$ul.css('width',this.$img.width()*(this.$img.length + 2)+'px')
        this.$ul.css('left', -this.$img.width())
        this.index = 0
        this.isAnimate = false
        this.$dot =  this.$carousel.find('.dot')
        console.log(this.$ul.width(),this.$img.length )


    },
    bind:function () {
        var _this = this
        this.btnNext.on('click',function () {
            _this.playNext()

        })
        this.btnLast.on('click',function () {
            _this.playLast()

        })
        this.$dot.on('click',function () {
            $(this).addClass('green').siblings().removeClass('green')
            if($(this).index() >  _this.index){
                _this.$ul.animate({
                    left :'-=' + _this.$img.width() *  ($(this).index() - _this.index)
                },100)
                _this.index = $(this).index()
                console.log(_this.index)
            }
            if($(this).index() <  _this.index){
                _this.$ul.animate({
                    left :'+=' + _this.$img.width() *  (_this.index - ($(this).index()) )
                },100)
                _this.index = $(this).index()
                console.log(_this.index)

            }
        })
        this.$carousel.on('mouseenter',function () {
            clearInterval(_this.clock)
            console.log('enete')
        })

    },
    changeDot:function () {
        this.$dot.eq(this.index).addClass('green').siblings().removeClass('green')
    },
    playNext:function () {
        if( this.index == this.$img.length - 1 ){
            this.$ul.css('left', 0)
            this.index = -1
        }
        this.index++

        this.changeDot()
        var _this = this

        if(this.isAnimate) return
        this.isAnimate = true
        this.$ul.animate({
            left :'-=' + this.$img.width()
        },100,function () {
            _this.isAnimate = false
        })
    },
    playLast:function () {
        var _this = this
        this.changeDot()
        if( this.index < 0){
            this.$ul.css('left', -(this.$img.width() * 4))
            this.index = 3

        }
        this.index--

        if(this.isAnimate) return
        this.isAnimate = true
        this.$ul.animate({
            left :'+=' + this.$img.width()
        },100,function () {
            _this.isAnimate = false
        })


    },
    autoplay:function () {

        var _this = this
        this.clock = setInterval(function () {
            _this.playNext()
        },3000)

    },


}

module.exports = carousel()
