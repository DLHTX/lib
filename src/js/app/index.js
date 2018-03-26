require('less/index.less')
require('less/nav.less')
require('less/section.less')
var $ = require('../lib/jquery')

//
// new carousel($('.carousel'))

$('.icon-down').on('click',function () {
    var t = $(window).scrollTop()
    console.log(t)
    var height =  $('.background img').height()
    $('body,html').animate({'scrollTop':t+height},500)
    console.log('xia')
})


// $(window).on('scroll',function () {
//
//     if ($(document).height()  <= $(window).height() + $(window).scrollTop() ) {
//
//       $('.pagebtn').removeClass('icon-down').addClass('icon-shang')
//
//     }else{
//         $('.pagebtn').removeClass('icon-shang').addClass('icon-down')
//
//
//     }
//
// })
