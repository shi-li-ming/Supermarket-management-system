var models = require('../db/db');
var express = require('express')
var router =express.Router();
var mysql = require('mysql')
var $sql = require('../db/sqlMap')
var conn=mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err');
    } else {
       // console.log(ret);
        res.send(ret);
    }
}
//全查询
router.post('/findAllCate',(req,res)=>{
    var sql_name=$sql.cate.select_cate_name;
    conn.query(sql_name,(err,result)=>{
    //console.log(result);
    if (err) {
        console.log(err);
    }
    // console.log(result);
    if (result[0] === undefined) {
        res.send('-1')   //查询不出，data 返回-1
    } else {
        jsonWrite(res, result);
    }
    })
})
//添加
router.post('/addCate',(req,res)=>{
    var sql_name=$sql.cate.add_cate_name;
    var params=req.body;
    //console.log("params==="+JSON.stringify(params));
    conn.query(sql_name, [params.cname,params.descs], function(err, result) {
    if (err) {
       console.log(err);
      }
    if (result) {
      jsonWrite(res, result);
    }
    })
    })
//删除操作
router.post('/deleteCate',(req,res)=>{
    let sql_name=$sql.cate.delete_cate_name;
    let params=req.body;
    //console.log("params==="+JSON.stringify(params))
    console.log(params.id);
    if(params.id){
        sql_name+=" where cid='"+params.id+"'";
    }
    else {
        sql_name+=" where cid='1'";
    }
    conn.query(sql_name,params.id,(err,result)=>{
            console.log(sql_name);
            if(err){
                console.log(err);
            }
            else {
                jsonWrite(res,result);
            }
        })
    
   
})
//单查询
     router.post('/getOneCate',(req,res)=>{ 
     let sql_name=$sql.cate.select_cate_name;
     var params=req.body;
    // console.log("params==="+JSON.stringify(params))
     if(params.id){
     sql_name+=" where cid='"+params.id+"'";
       }
     else{
    sql_name+=" where cid='1'";
     }
     conn.query(sql_name,(err,result)=>{
     if(err){
     console.log(err);
    }
     else {
    jsonWrite(res,result);
    }
   })
   })
//修改
router.post('/updateCate',(req,res)=>{
  let sql_name=$sql.cate.update_cate_name;
  let params=req.body;
if(params.id){
    sql_name+="  cname='"+params.cname+"',descs='"+params.descs+"'  where cid='"+params.id+"'";
}
else{
    sql_name+=" cname='1',descs='1' where cid='1'";
}
conn.query(sql_name, [params.id],(err,result)=>{
  console.log(sql_name);
  if(err){
      console.log(err)
  }
  else{
      jsonWrite(res,result);
  }
})
})
module.exports = router;