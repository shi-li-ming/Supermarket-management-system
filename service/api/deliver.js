var models = require('../db/db');
var express = require('express')
var router =express.Router();
var mysql = require('mysql')
var $sql = require('../db/sqlMap');
const { deliver } = require('../db/sqlMap');
var conn=mysql.createConnection(models.mysql);

conn.connect();
//日期格式
var dateStr = function(str) {
    //return new Date(str.slice(0,7));
    let date =new Date(str);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
}
//
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err');
    } else {
       // console.log(ret);
        res.send(ret);
    }
}
 //全查询
 router.post('/findAllDeliver',(req,res)=>{
  let sql_name=$sql.deliver.select_deliver_name;
  conn.query(sql_name,(err,result)=>{
   // console.log(JSON.stringify(result))
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
  router.post('/addDeliver',(req,res)=>{
    let sql_name=$sql.deliver.add_deliver_name;
    let params=req.body;
    conn.query(sql_name, [params.stockid,params.delivernum,params.deliverprice,dateStr(params.deliverdate),params.receive,params.handle],(err,result)=>{
     // console.log(JSON.stringify(result))
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
  //单查询
  router.post('/findByOneDeliver',(req,res)=>{
    let sql_name=$sql.deliver.select_deliver_name;
    let params=req.body;
    if(params.id){
        sql_name+=" and did='"+params.id+"'";
    }
    else{
        sql_name+=" and did='0'";
    }
    conn.query(sql_name,params.is,(err,result)=>{
        // console.log(JSON.stringify(result))
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
  //修改
  router.post('/updateDeliver',(req,res)=>{
  let sql_name=$sql.deliver.update_deliver_name;
  let params=req.body;
  
  if(params.id){
      sql_name+=" delivernum='"+params.delivernum+"',deliverprice='"+params.deliverprice+
      "',deliverdate='"+dateStr(params.deliverdate)+"',receive='"+params.receive+
      "',handle='"+params.handle+"' where did='"+params.id+"'";
  }
  else{
      sql_name+=" delivernum='1' where did='0'";
  }
  conn.query(sql_name,[params.delivernum,params.deliverprice,params.deliverdate,params.receive,params.handle,params.id],(err,result)=>{
   // console.log(sql_name);
   // console.log(JSON.stringify(result))

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
  //删除
  router.post('/deleteDeliver',(req,res)=>{
   let sql_name=$sql.deliver.delete_deliver_name;
   let params=req.body;
   console.log(sql_name);
   if(params.id){
    sql_name+=" where did='"+params.id+"'";
}
else{
    sql_name+=" where did='0'";
}
   conn.query(sql_name,params.id,(err,result)=>{
   
    console.log(JSON.stringify(result))

    if (err) {
        console.log(err);
    }
    else {
        jsonWrite(res, result);
    }
  })
  })
module.exports = router;