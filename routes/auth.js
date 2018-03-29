var express = require('express');
var router = express.Router();
var User = require('../models/user.js').User
var session = require('express-session')
var passport = require('passport');//passport模块专门处理登录


router.get('/log', function(req, res, next) {
    res.render('log', { title: 'Express' });
});









router.post('/register', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password

    User.findAll({raw:true, where:{username:username}}).then(function(e){
        if(e[0] === undefined ){
            User.create({username:username , password:password ,role:0}).then(function(){
                res.send({status:0 ,msg: "注册成功"})
            }).catch(function () {
                res.send({status:1 , errorMsg:'数据库出错(添加)'})
            })
        }else{
            res.send({status:2})
        }
    })
});



router.post('/login', function(req, res, next) {
    var username = req.body.username
    var password = req.body.password

    User.findAll({raw:true,
        where:{
            $and :[
                {username:username},
                {password:password}

            ]
        }}).then(function(user){
        console.log(user)
        if(user[0] !== undefined && user[0].username === username ){
            if(user[0].password === password){
                console.log('success')
                req.session.user = {
                    username:username
                }//先设置session 再进行页面跳转
                res.send({status:0 ,msg: "登陆成功"})
               /* res.redirect('/');*/
            }

        }else if(user[0] === undefined){
            console.log('没有用户')
            res.send({status:2 ,msg: "没有用户"})
        }

    });



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

        })













    router.get('/logout', function(req, res) {
        req.session.destroy();
        res.redirect('/');
        /*res.send({status:0})*/
    });


});

module.exports = router;