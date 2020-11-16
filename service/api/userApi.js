var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err');
    } else {
       // console.log(ret);
        res.send(ret);
    }
}

var dateStr = function(str) {
    //return new Date(str.slice(0,7));
    let date =new Date(str);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
}

// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
   // console.log(params);
    //console.log(params.birth);
    console.log( "====="+dateStr(params.birth))
    conn.query(sql, [params.username, params.account, params.password, params.repeatPass,
                    params.email, params.phone, params.card, dateStr(params.birth), params.sex], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//查找用户接口
router.post('/login', (req, res) => {
    var sql_name = $sql.user.select_name;
    // var sql_password = $sql.user.select_password;
    var keywords = req.body;
    if (keywords.name) {
        sql_name += " where username ='"+ keywords.name +"'";
        console.log(sql_name);
    }    
    conn.query(sql_name, keywords.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            var resultArray = result[0];
            //console.log(resultArray);
            //console.log(keywords);
            if(resultArray.password === keywords.password) {
                jsonWrite(res, result);
            } else {
                res.send('0')   //username
            }
        }
    })
});

//获取用户信息
router.get('/getUser', (req, res) => {
    var sql_name = $sql.user.select_name;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
   // console.log(params);
    if (params.id) {
        sql_name += "where username ='"+ params.name +"'";
    }
    conn.query(sql_name, params.id, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
});
//查询单个用户
    router.post('/findOne',(req,res)=>{
    var sql_name=$sql.user.select_name;
    var params=req.body;
   //console.log("params.id=="+params.id);
if(params.id){
    sql_name+=" where id='"+params.id+"'";
}
conn.query(sql_name,params.id,(err,result)=>{
    // console.log(sql_name);
    // console.log(JSON.stringify(result));
    if(err){
        console.log(err)
    }
    if (result[0] === undefined) {
        res.send('-1')   //查询不出username，data 返回-1
    } else {
        jsonWrite(res, result);
    }
})
})
//更新用户信息
router.post('/updateUser', (req, res) => {
    var sql_update = $sql.user.update_user;
    var params = req.body;
  //  console.log( "====="+dateStr(params.birth))
    if (params.id) {
        sql_update  += " email = '" + params.email +
                        "',phone = '" + params.phone +
                        "',card = '" + params.card +
                        "',username = '" + params.username +
                        "',password = '" + params.password +
                        "',repeatPass = '" + params.repeatPass +
                        "',sex = '" + params.sex +
                        "',account = '" + params.account +
                        "',birth = '" +  dateStr(params.birth) +
                        "' where id ='"+ params.id + "'";
    }  

    conn.query(sql_update, params.id, function(err, result) {
        if (err) {
            console.log(err);
        }
         else {
            jsonWrite(res, result);
        }
    })
});

//更改密码
router.post('/modifyPassword', (req, res) => {
    var sql_modify = $sql.user.update_user;
    var params = req.body;
 
    if (params.id) {
        sql_modify +=  " password = '" + params.pass +
                        "',repeatPass = '" + params.checkPass +
                        "' where id ='"+ params.id + "'";
    }
    conn.query(sql_modify, params.id, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result.affectedRows === undefined) {
            res.send('修改密码失败，请联系管理员')   //查询不出username，data 返回-1
        } else {
           jsonWrite(res, result);
        }
    })
});
 
//查询用户信息
router.post('/finduser',(req,res)=>{
    var sql_name=$sql.user.select_name;
   
    conn.query(sql_name , function (err,result) {
      //  console.log("res===="+JSON.stringify(result));
        if (err) {
            console.log(err);
        }
        jsonWrite(res, result);
        
    })
})
//删除用户信息
router.post('/deleteuser',(req,res)=>{
 var sql_name=$sql.user.delete_user;
 var params = req.body;
 console.log("parms==="+params.id);
 if(params.id){
     sql_name+=" where id ='"+ params.id +"'";
 }
 else{
     sql_name+=" where id='1'";
 }
    conn.query(sql_name,params.id, function (err,result) {
         console.log(sql_name);
     if(err){
         console.log(err)
     }
     else{
         jsonWrite(res,result);
     }
   })
})
//分页
router.post('/findbypage',(req,res)=>{
    var sql_name=$sql.user.select_name;
    var params=req.body;
    //console.log("params.currentpage===="+JSON.stringify(params));
    ////console.log("params.pageSize===="+params.pageSize)
    ///console.log("params.currentpage===="+params.currentpage)
    let fordata={
        currentpage: params.currentpage,
        pageSize: params.pageSize
    }
    //console.log("fordata===="+JSON.stringify(fordata));
    if(params!=undefined){
        //sql_name+="  limit '"+params.currentpage , params.pageSize+"'";
        sql_name+=" limit '"+params.currentpage+','+ params.pageSize+"'";
    }
    conn.query(sql_name,fordata,(err,result)=>{
      //  console.log(sql_name);
      /////  console.log("result==="+JSON.stringify(result))
    })
})
module.exports = router;
