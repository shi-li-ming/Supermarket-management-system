var sqlMap = {
    user: {
        add: 'insert into user (username, account, password, repeatPass, email, phone, card, birth, sex) values (?,?,?,?,?,?,?,?,?)',
        select_name: 'select * from user', 
        update_user: 'update user set',
        delete_user: 'delete from user '
      },
    cate:{
        select_cate_name: 'select * from category',
        add_cate_name: 'insert into category(cname,descs) values(?,?)',
        delete_cate_name: 'delete from category',
        update_cate_name: 'update  category set'
      },
      shop:{
        select_shop_name: 'SELECT shop.`sid`,shop.stockid,stock.`stockname`,stock.`stocknum`,category.`cname`,shop.`sellprice`,shop.`saleprice`,shop.`snum`,shop.`salenumprice`,shop.`sellnumprice`FROM shop,stock,category WHERE shop.`stockid`=stock.`stockid` AND stock.`cid`=category.`cid`        ',
        add_shop_name: 'insert into shop(stockid,sellprice,saleprice,snum,salenumprice,sellnumprice) values(?,?,?,?,?,?)' ,
        delete_shop_name: 'delete from shop' ,
        update_shop_name: 'update shop set'
      },
      stock:{
        select_stock_name:'select * from stock' ,
        add_stock_name: 'insert into stock(stockname,stocknum,stockprice,cid,stockdate) values(?,?,?,?,?)' ,
        delete_stock_name : 'delete from stock' ,
        update_stock_name: 'update stock set '
      },
      deliver:{
        select_deliver_name: 'SELECT deliver.* ,stock.`stockname` FROM deliver,stock WHERE deliver.`stockid` = stock.`stockid`' ,
        add_deliver_name: ' insert into deliver(stockid,delivernum,deliverprice,deliverdate,receive,handle) values(?,?,?,?,?,?)',
        update_deliver_name: 'update deliver set' ,
        delete_deliver_name: 'delete from deliver'
      }
}

module.exports = sqlMap;