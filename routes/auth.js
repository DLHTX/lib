var express = require('express');
var router = express.Router();
var User = require('../models/user.js').User
var session = require('express-session')
var passport = require('passport');//passport模块专门处理登录
var superagent = require('superagent');
var cheerio = require('cheerio');


router.get('/log', function(req, res, next) {
    res.render('log', { title: 'Login' });
});



router.get('/reg', function(req, res, next) {
    res.render('reg', { title: 'Register' });
});






router.post('/register', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password

    User.findAll({raw:true, where:{username:username}}).then(function(e){
        if(e[0] === undefined ){
            User.create({username:username , password:password ,love:'1388661'}).then(function(){
                res.send({status:0 ,msg: "注册成功"})
            }).catch(function () {
                res.send({status:1 , errorMsg:'数据库出错(添加)'})
            })
        }else{
            res.send({status:2})
        }
    })
});



router.post('/login', function(req, res, next){
    var username = req.body.username
    var password = req.body.password

    User.findAll({
        raw : true,
        where : {
            $and : [
                {username : username},
                {password : password}

            ]
        }
    }).then(function(user){
        console.log(user)
        if(user[0] !== undefined && user[0].username === username){
            if(user[0].password === password){
                console.log('success')
                req.session.user = {
                    username : username
                }//先设置session 再进行页面跳转
                res.send({status : 0, msg : "登陆成功"})
                /* res.redirect('/');*/
            }

        } else if(user[0] === undefined){
            console.log('没有用户')
            res.send({status : 2, msg : "没有用户"})
        }

    });
})



router.post('/editpassword', function(req, res, next) {
        var username = req.body.username
        var password = req.body.password
        var editpassword = req.body.editpassword

        User.update({password:editpassword },{where:{username:username}}).then(function(e){
                console.log(e[0])
                res.send({status:0 ,msg:'密码修改成功'})
            }).catch(function () {
            res.send({status:1 , errorMsg:'数据库出错(编辑)'})
        })

        });




router.post('/love', function(req, res,next) {
    console.log(req.session.user, req.session.user.username)
    if(!req.session.user){
       return res.send({status:1,msg:'请登陆'})
    }
    var username = req.session.user.username
    var love = req.body.id;

    User.create({love:love,username:username}).then(function(){
            res.send({status:0 ,msg:'添加成功'})
     })

    /*res.send({status:0})*/
});



router.post('/getlove', function(req, res,next) {
    var username = req.session.user.username

    User.findAll({raw:true,where:{username:username}}).then(function(ret){
        res.send({status:0 ,msg:'添加成功',data:ret})
    })

    /*res.send({status:0})*/
});




router.post('/getbook', function(req, res) {
        var reptileUrl = "https://book.douban.com/latest";
        superagent.get(reptileUrl).end(function (err, res){
            var $ = cheerio.load(res.text);
            var data = [];
            $('.cover-col-4 li').each(function(i, elem){
                var _this = $(elem);
                data.push({
                    href : _this.find('.cover').attr('href').replace(/\/p\//, ""),
                    img : _this.find('.cover img').attr('src').replace(/\/p\//, ""),
                    title : _this.find('.detail-frame a').text().replace(/\/p\//, ""),
                    detail: _this.find('.detail-frame .color-gray').text().replace(/[ ]/g,"")
                });
            });
           send(data)
        });
     function send(data){
         res.send({status:0 ,data:data})
     }
    });


router.post('/getbackimg', function(req, res) {
    var idx = req.body.idx

    var reptileUrl = "http://cn.bing.com/HPImageArchive.aspx?format=js&"+"idx="+idx+"&n=1";
    superagent.get(reptileUrl).end(function (err, res){
        console.log(idx)
       send(res.text)
    });
    function send(data){
        res.send({status:0 ,data:data})
    }

});



router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
    /*res.send({status:0})*/
});

router.get('/search', function(req, res, next) {
    res.render('search', { title: 'Express' });
});




module.exports = router;