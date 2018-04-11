var $ = require('../lib/jquery');
var Event = require('../mod/event');
var Toast = require('../mod/toast').Toast

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
var req = getRequest();
if(req.q === undefined){
    console.log('no search')
}else{
    $('nav .q').text(req.q)
    getbook()
}




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
                 var tpl  = `
           <div class="bookBox">
                    <a href="#">
                    <img src="https://img1.doubanio.com/view/subject/m/public/s4293097.jpg" alt="" ></a>
                    <div class="detail">
                        <h3 class="title"></h3>
                        <p class="author"></p>
                        <p class="publisher"></p>
                        <p class="author"></p>
                        <h2 class="price"></h2>
                    </div>
                    <div class="love">收藏</div>
	     	</div>
                         `
                 this.$book = $(tpl)
                 this.$book.find('a').attr('href',book.alt);
                 this.$book.find('img').attr('src',book.image);
                 this.$book.find('.title').text(book.title);
                 this.$book.find('.author').text('作者:'+ book.author[0]);
                 /*this.$book.find('.pubdate').text('出版社:'+ book.pubdate);*/
                 this.$book.find('.publisher').text( '出版社:'+ book.publisher);
                 this.$book.find('.isbn').text('ISBN:'+  book.isbn13);
                 this.$book.find('.price').text( book.price);
                 this.$book.find('.love').attr('data-id',book.id);
                 this.id =  book.id;
                  $('.container').append($book);
     })


    $('.love').on('click',function(){
        var _this = this
      $.post('/auth/love',{id:$(this).attr('data-id')}).done(function(ret){
          if(ret.status === 0){
              Toast('收藏成功');
              $(_this).addClass('loved').text('已收藏')
          }if(ret.status === 1){
              Toast('请先登陆');
              location.href='/auth/log'
          }if(ret.status === 2){
              Toast('您已收藏此书！请勿重复收藏');
              $(_this).addClass('loved').text('已收藏')
          }
      })
    })




    $('.login-btn').on('click',function(){
        var username = $('#logusername').val()
        var password =  $('#logpassword').val()
        $.ajax({
            url:'/auth/login',
            type:'POST',
            data:{
                username:username,
                password:password
            }
        }).done(function(ret){
            if(ret.status === 0){
                Toast('登陆成功!');
                location.href='/'
            } else if (ret.status === 2){
                Toast('用户名或密码不正确')
            }
        });
    })


    $('.editpassword-btn').on('click',function(){
        var username = $('#editusername').val()
        var editpassword = $('#editpassword').val()
        $.ajax({
            url:'/auth/editpassword',
            type:'POST',
            data:{
                username:username,
                editpassword:editpassword
            }
        }).done(function(ret){
            if(ret.status === 0){
                Toast('修改成功!');
                location.href='/'
            } else if (ret.status === 2){
                Toast('用户名不正确')
            }
        });
    })


    $('.getlove').on('click',function(){
        $.post('auth/getlove').done(function(ret){
            if(ret.status === 0){
                ret.data.forEach(function(data){
                    $.ajax({
                        url:'https://api.douban.com/v2/book/'+data.love,
                        type:'GET',
                        dataType:'jsonp'
                    }).done(function(ret){
                        console.log(ret)
                        $('#container').XSwitch({
                            index: 0
                        });
                    })
                })
                Toast('查询成功')
            } else if (ret.status === 1){
                Toast('不成功')
            }
        })
    })




}
