var models = require('../db/db');
var express = require('express')
var router =express.Router();
var mysql = require('mysql')
var $sql = require('../db/sqlMap')
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
 router.post('/findGetStock',(req,res)=>{
 let sql_name=$sql.stock.select_stock_name;
 conn.query(sql_name,(err,result)=>{
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
 router.post('/addStock',(req,res)=>{
   let sql_name=$sql.stock.add_stock_name;
   let params=req.body;
  // console.log(sql_name);
 // console.log("params===="+JSON.stringify(params));
   conn.query(sql_name, [params.stockname, params.stocknum,params.stockprice, params.cid, dateStr(params.stockdate)],(err,result)=>{
    if (err) {
        console.log(err);
    }
    else {
        jsonWrite(res, result);
    }
   })
 })
 //删除
 router.post('/deleteStock',(req,res)=>{
  let sql_name=$sql.stock.delete_stock_name;
  let params=req.body;
  if(params.id){
      sql_name+=" where stockid='"+params.id+"'";
  }
  else{
      sql_name+=" where stockid='0'";
  }
  conn.query(sql_name,params.id,(err,result)=>{
    if (err) {
        console.log(err);
    }
    else {
        jsonWrite(res, result);
    }
  })
 })
 //单查询
  router.post('/findByOneStock',(req,res)=>{
    let sql_name=$sql.stock.select_stock_name;
    let params=req.body;
    if(params.id){
        sql_name+=" where stockid='"+params.id+"'";
    }
    else {
        sql_name+=" where stockid='0'";
    }
    conn.query(sql_name,params.id,(err,result)=>{
      //  console.log("data=="+JSON.stringify(result));
        if (err) {
            console.log(err);
        }
        // console.log(result);
         else {
            jsonWrite(res, result);
        }
     })
  })
  //修改
  router.post('/updateStock',(req,res)=>{
    let sql_name=$sql.stock.update_stock_name;
    let params=req.body;
    if(params.id){
        sql_name+=" stockname='"+params.stockname+"',stocknum='"+params.stocknum+
        "',stockprice='"+params.stockprice+"',cid='"+params.cid+"',stockdate='"+dateStr(params.stockdate)+
        "'  where stockid='"+params.id+"'";
    }
    else {
        sql_name+=" stockname='1' where stockid='0'";
    }
    conn.query(sql_name,[ params.stockname,params.stocknum,params.stockprice,params.cid,params.stockdate,params.id],(err,result)=>{
        console.log("data=="+JSON.stringify(result));
        if (err) {
            console.log(err);
        }
        // console.log(result);
         else {
            jsonWrite(res, result);
        }
    })
  })
module.exports = router;