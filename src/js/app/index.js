require('less/index.less');
require('less/nav.less');
require('less/section.less');
require('less/toast.less');

const http = require('https');
const url = require('url');
const urlencode = require('urlencode')


var $ = require('../lib/jquery');
var book = require('../mod/book').book;
var Toast = require('../mod/toast').Toast


//
// new carousel($('.carousel'))

new book();


$.post('/auth/getbook').done(function(ret){
    if(ret.status === 0){
        ret.data.forEach(function(book){
            var tpl = ` <li>
                    <a href="#">
                        <img src=""/>
                    </a>
                </li>`

            $img = $(tpl)
            this.$img.find('a img').attr('src',book.img)
            this.$img.find('a').attr('href',book.href)
            $('.news-book-list-ul').append($img)
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
        background:"url( "+bakurl+")"
    })
})


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






$('.menu').on('mouseenter',function(){
    $('.menuList').addClass('active')
})
$('.menuList').on('mouseleave',function(){
    $('.menuList').removeClass('active')
})
$('.menuList div').on('mouseenter',function(){
    $(this).addClass('activeDiv')
})
$('.menuList div').on('mouseleave',function(){
    $(this).removeClass('activeDiv')
})


var idx = 1
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
            background:"url( "+bakurl+")"
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
            background:"url( "+bakurl+")"
        })
    })
})



//bilibili搜索并且发送ajax

/*
$('.biliBtn').on('click',() => {
    let word = $('.bili').val()
    let keyword = urlencode(word,'utf-8')
    getVideo(keyword)
})


function getVideo(keyword){
/!*    let biliUrl = 'https://search.bilibili.com/api/search?s'+
        'earch_type=all&keyword='+keyword+'&from_source=banner_search'
    http.get(biliUrl, (res) => {
        var data = '';  //接口数据

    res.on('data', (chunk) => {
        data += chunk;    //拼接数据块
});
    res.on('end', function() {
        let json = JSON.parse(data); //解析json
        console.log(json.result.video);  //打印json
    })
}).on('error', () =>
    console.log('获取数据出错!')
);*!/
$.ajax({
    url:'https://search.bilibili.com/api/search?search_type=all&keyword='+keyword+'&from_source=banner_search&page=1',
    type:'GET',
    dataType:'jsonp'
}).done(function(rey){
    console.log(rey.result.video)
})
}
*/









