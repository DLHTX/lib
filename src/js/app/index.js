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
var music = require('../mod/music.js').music;


new music();
new book();



setInterval(function(){
    var mydate = new Date();
    var h=mydate.toLocaleDateString();
    $("#time").text(h);
},1000)







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




