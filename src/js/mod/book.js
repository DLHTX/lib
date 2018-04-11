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

        $.post('/auth/getbook').done(function(ret){
            console.log(ret)
            if(ret.status === 0){
                ret.data.forEach(function(book){
                    var tpl = ` <li class="poster-item  zturn-item" >
                    <p class="xxgy">学员感言1</p>
            
                    <div class="for_btn">
                    
                     <img src="" width="100%">
                    </div>

                    <div class="students_star">
                        <p class="cell_list">
                       
                        </p>
                       
                    </div>
                </li>`
                    $img = $(tpl)
                    this.$img.find('img').attr('src',book.img)
                    this.$img.find('.xxgy').text(book.title)
                    this.$img.find('.cell_list').text( "出版社:"+book.detail)

                    $('#zturn').append($img)

                    var aa=new zturn({
                        id:"zturn",
                        opacity:0.9,
                        width:450,
                        //382
                        Awidth:1024,
                        scale:0.95
                       /* id: "zturn", //容器的id
                        opacity: 0.9, //透明度比例
                        width: 382, //单个轮播元素大小
                        Awidth: 1024, //整个轮播容器宽度
                        scale: 0.9 //缩放比例*/
                    })

                })
            } else if (ret.status === 1){
                Toast('用户名或密码不正确')
            }
        })

        $.post('auth/getbackimg',{idx : 0}).done(function(ret){
            Toast('背景图更新完成!');
            var obj = $.parseJSON(ret.data)
            var bakurl = "http://cn.bing.com/"+obj.images[0].url
            $(".section").css({
                "background":"url( "+bakurl+") center center no-repeat",
                "background-size":"cover"
            })
        })


    },
    bind:function(){

    },
    bindEvent:function(){
        var idx = 1
        var _this = this
        $('.searchBtn').on('click',function(){
            _this.searchContent =  $('.search-content').val()
            _this.search()
        });


        $('.register-btn').on('click',function(){
            var username = $('#username').val()
            var password =  $('#password').val()
            var password2 = $('#password2').val()
            var regex = /^\D{3,8}$/
            if (!regex.test(username)) {
                $('.errormsg').text('用户名长度为3-8位字母！')
                return;
            }
            if (!password || !password2) {
                $('.errormsg').text('密码不可为空！')
                return;
            }
            if (password !== password2) {
                $('.errormsg').text('两次密码输入不一致,请重新输入！')
                return;
            }
            console.log('click')
            console.log(password)
            $.ajax({
                url:'/auth/register',
                type:'POST',
                data:{
                    username:username,
                    password:password
                }
            }) .done(function(ret){
                if(ret.status === 0){
                    console.log("注册成功")
                    Toast('注册成功!');
                    location.href='/auth/log'
                }else if(ret.status === 2){
                    Toast("用户名已经存在");
                }else {
                    Toast(ret.errorMsg);
                }
            });
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
            var _this =this
            $.post('auth/getlove').done(function(ret){
                if(ret.status === 0){
                    ret.data.forEach(function(data){
                        $.ajax({
                            url:'https://api.douban.com/v2/book/'+data.love,
                            type:'GET',
                            dataType:'jsonp'
                        }).done(function(book){
                            console.log(book)

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
                    <div class="love loved">已收藏</div>
	     	</div>
                         `
                                _this.$book = $(tpl)
                                _this.$book.find('a').attr('href',book.alt);
                                _this.$book.find('img').attr('src',book.image);
                                _this.$book.find('.title').text(book.title);
                                _this.$book.find('.author').text('作者:'+ book.author[0]);
                                _this.$book.find('.publisher').text( '出版社:'+ book.publisher);
                                _this.$book.find('.isbn').text('ISBN:'+  book.isbn13);
                                _this.$book.find('.price').text( book.price);
                                _this.$book.find('.love ').attr('data-id',book.id);
                                _this.id =  book.id;
                                $('.lovebook').append(_this.$book);
                            })
                        })
                    Toast('查询成功')
                    } else if (ret.status === 1){
                    Toast('不成功')
                }
            })
        })




        $('#section1 .icon-next').on('click',function(){
            Toast('加载成功')
            idx++
            if(idx > 7 ) {
                Toast('没有图片啦！')
                return idx=7
            }

            $.post('auth/getbackimg',{idx : idx}).done(function(ret){
                var obj = $.parseJSON(ret.data)
                console.log(idx)
                console.log("http://cn.bing.com/"+obj.images[0].url)
                var bakurl = "http://cn.bing.com/"+obj.images[0].url
                $(".section").css({
                    "background":"url( "+bakurl+") center center no-repeat",
                    "background-size":"cover"
                })
            })
        })

        $('#section1 .icon-pre').on('click',function(){
            Toast('加载成功')
            idx--
            if(idx < -1) {
                Toast('没有图片啦！')
                return idx=-1
            }
            $.post('auth/getbackimg',{idx : idx}).done(function(ret){
                var obj = $.parseJSON(ret.data)
                console.log(idx)
                console.log("http://cn.bing.com/"+obj.images[0].url)
                var bakurl = "http://cn.bing.com/"+obj.images[0].url
                $(".section").css({
                    "background":"url( "+bakurl+") center center no-repeat",
                    "background-size":"cover"
                })
            })
        })

    },
    search:function(){
        if(this.searchContent ){
           /* $(location).attr('href', 'http://localhost:3012/auth/search?q='+this.searchContent)*/
            /*console.log(window.location.href)*/
            window.open(window.location.href+'auth/search?q='+this.searchContent);
        }else{
            Toast('输入值不能为空')
        }
    },


};


module.exports.book = book;
