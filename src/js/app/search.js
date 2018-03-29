var $ = require('../lib/jquery');
var Event = require('../mod/event')

console.log('aaaaaaa')

function getRequest() {
    var url = window.location.search; //url传参
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

var req = getRequest()
console.log(req.q)
getbook()


function getbook(){
    $.ajax({
        url:'https://api.douban.com/v2/book/search',
        type:'GET',
        dataType:'jsonp',
        data:{
            q:req.q
        }
    }).done(function(ret){
        console.log(ret.books)
        setbook(ret.books)
    })
}

function setbook(ret){
     ret.forEach(function(book){
                 var tpl  = `<span id="searchBox" class = "clearfix">
                            <a href="#"><img src="https://img1.doubanio.com/mpic/s4293097.jpg" alt=""></a>
                            <span class="detail">
                                <div class="name"></div>
                                <div class="author"></div>
                                <div class="pubdate"></div>
                                <div class="publisher"></div>
                                <div class="isbn"></div>
                                <div class="price"></div>
                            </span>
                         </span>
                         `
                 this.$book = $(tpl)
                 this.$book.find('a').attr('href',book.alt)
                 this.$book.find('img').attr('src',book.image)
                 this.$book.find('.name').text('书名:'+ book.title)
                 this.$book.find('.author').text('作者:'+ book.author[0])
                 this.$book.find('.pubdate').text('出版社:'+ book.pubdate)
                 this.$book.find('.publisher').text( '出版时间:'+ book.publisher)
                 this.$book.find('.isbn').text('ISBN:'+  book.isbn13)
                 this.$book.find('.price').text( '价格:'+ book.price)
         $('#content').append($book)
     })

}
