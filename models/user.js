var Sequelize = require('sequelize');
var path = require('path');

var sequelize = new Sequelize(undefined,undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',

    // SQLite only
    storage: path.join(__dirname, '../database/database.sqlite')
});

/*
sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
   .catch(function (err) {
      console.log('Unable to connect to the database:', err);
   }); /!*测试数据库连接是否正常*!/
*/



var User = sequelize.define('userinfo',{
    /*id: {
        type: Sequelize.STRING(50),
        primaryKey: true//主键
    },*/
    username: Sequelize.STRING,//用户名
    password: Sequelize.STRING,//密码 字符串
    /*role: Sequelize.INTEGER,//权限 整数*/
},{freezeTableName: true,timestamps: false});
//模型创建
//timestamp字段表示数据库中是否会自动更新createdAt和updatedAt字段，
// false表示不会增加这个字段。freezeTableName为false表示该模型对应的表明就为userinfo表，
// 默认时为true，对应表名为userinfos


//User.create({username:"dhtyx", password:"123456", role:0})
// username role password对应相应的字段名
//User.sync({force:true})
User.findAll({raw: true}).then(function(articles) {
    console.log(articles)
})
/*
User.find({  where:{username:"asdasd" , password:"123456"}}).then(function(a){
    console.log(a)
})
*/

/*User.findAll({raw:true,
    where:{
    $and :[
        {username:'xlj'},
        {password:'123456'}
]
}}).then(function(e){
    console.log(e[0].username)
});*/
    /*
.then(function(){
    User.findAll({raw:true,where:{password:'1234576'}})
})
*/

module.exports.User= User