var $ = require('../lib/jquery');
var Toast = require('./toast.js').Toast
var getQ = require('../app/search').getQ;

function book(){
    this.init()
    this.bind()
    this.bindEvent()

}
book.prototype = {
    defaultOpts:{
        id:'',
        star:'',
        username:''
    },
    init:function(){
     console.log('init')
    },
    bind:function(){

    },
    bindEvent:function(){
        var _this = this
        $('.searchBtn').on('click',function(){
            _this.searchContent =  $('.search-content').val()
            console.log(this.searchContent)
            _this.search()
        });
    },
    search:function(){
        if(this.searchContent ){
            $(location).attr('href', 'http://localhost:3000/search?q='+this.searchContent)
        }else{
            Toast('输入值不能为空')
        }
    }

};


module.exports.book = book;
