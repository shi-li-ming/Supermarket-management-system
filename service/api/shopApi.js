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
//查询
router.post('/findAllShop',(req,res)=>{
    let sql_name=$sql.shop.select_shop_name;
    conn.query(sql_name,(err,result)=>{
       // console.log(JSON.stringify("DATA====="+result))
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
router.post('/addShop',(req,res)=>{
 let sql_name=$sql.shop.add_shop_name;
 let params=req.body;
// console.log("sql===="+sql_name)
  //console.log("params"+JSON.stringify(params))
  conn.query(sql_name, [params.stockid,params.sellprice,params.saleprice,params.snum,params.salenumprice,params.sellnumprice] ,(err,result)=>{
   //  console.log(sql_name)
    if(err){
     console.log(err)
    }
    else{
     jsonWrite(res,result);
    }
 })
})
// 删除
  router.post('/deleteShop',(req,res)=>{
   let sql_name=$sql.shop.delete_shop_name;
   let params=req.body;
   if(params.id){
       sql_name+=" where sid='"+params.id+"'";
   }
   else {
       sql_name+=" where sid='0'";
   }
   conn.query(sql_name,params.id,(err,result)=>{
    if(err){
        console.log(err)
       }
    else{
        jsonWrite(res,result);
       }
   })
  })
  // 单查询
  router.post('/findByOneShop',(req,res)=>{
   let sql_name=$sql.shop.select_shop_name;
   let params=req.body;
   console.log("params===="+params.id);
   if(params.id){
       sql_name+=" and sid='"+params.id+"'";
   }
   else{
       sql_name+=" and sid='0'";
   }
   conn.query(sql_name,params.id,(err,result)=>{
    if(err){
        console.log(err)
       }
    else{
        jsonWrite(res,result);
       }
   })
  })
  //修改
  router.post('/updateShop',(req,res)=>{
  let sql_name=$sql.shop.update_shop_name;
  let params=req.body;
  if(params.id){
      sql_name+=" sellprice='"+params.sellprice+"',saleprice='"+params.saleprice+"',snum='"+params.snum+"',sellnumprice='"+params.sellnumprice+"',salenumprice='"+params.salenumprice+"'  where sid='"+params.id+"'";
  }
  else {
      sql_name+=" sellprice='1' where sid='0'";
  }
  conn.query(sql_name, [params.sellprice,params.saleprice,params.snum,params.sellnumprice,params.salenumprice,params.id],(err,result)=>{
    if(err){
        console.log(err)
       }
    else{
        jsonWrite(res,result);
       }
  })
  })
module.exports = router;