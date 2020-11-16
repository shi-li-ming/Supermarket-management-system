const userApi = require('./api/userApi');
//分类
const cateApi =require('./api/cateGory');
//商品
const shopApi = require('./api/shopApi');
//进货
const stockApi = require('./api/stockApi');
//出货
const deliverApi = require('./api/deliver');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

app.use('/api/user', userApi);
app.use('/api/cate',cateApi);
//商品
app.use('/api/shop',shopApi);
//进货
app.use('/api/stock',stockApi);
//出货
app.use('/api/deliver',deliverApi);
app.listen(3000);
console.log('success listen at port: 3000')