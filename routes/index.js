var express = require('express');
var router = express.Router();

var session = require('express-session')
var passport = require('passport');//passport模块专门处理登录

/* GET home page. */
router.get('/', function(req, res, next) {
    var logindata
    if(req.session.user){
        logindata = {
            isLogin:true,
            user:{
                username:req.session.user.username
            }
        }
    }else{
        logindata = {
            isLogin:false
        }
    }


  res.render('index', logindata);//传值！！！！！！！！！！！！！！！！！！


});


module.exports = router;
