require('less/index.less');
require('less/nav.less');
require('less/section.less');


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
        Toast('检索成功!');
        console.log(ret)
    } else if (ret.status === 1){
        Toast('用户名或密码不正确')
    }
})



$('.register-btn').on('click',function(){
    var username = $('#username').val()
    var password =  $('#password').val()
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







