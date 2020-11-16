<template>
  <div>
    <div class="crumbs">
    <el-breadcrumb separator="/">
     <el-breadcrumb-item><i class="el-icon-edit"></i>进货管理</el-breadcrumb-item>
     <el-breadcrumb-item>进货查找</el-breadcrumb-item>
     </el-breadcrumb>
   	</div>
    <div class="buttons">
      <el-button type="primary" icon="el-icon-edit" size="small"  @click="addVisible">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
    <el-table-column label="编号" type="index" :index="indexMethod"  width="90"></el-table-column>
    <el-table-column prop="stockname" label="进货名称" width="140"></el-table-column>
    <el-table-column prop="stocknum" label="进货数量" width="140"></el-table-column>
    <el-table-column prop="stockprice" label="进货价格"  width="140"></el-table-column>
     <el-table-column prop="stockdate" label="进货日期" :formatter="dataFormat" width="180"></el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      <div>
        <el-dialog :title="title" :visible.sync="DialogVisible" width="30%" >
        <!-- 增加修改操作 -->
        <AddEditStock :addedit="addedit" v-if="dshow" :did="did" v-on:DialogVisible="closeAdd"></AddEditStock>

       <!--  删除 -->
        <Delete v-on:DialogVisible="closeAdd" v-if="!dshow" :delname="delname" :did="did"></Delete>
        </el-dialog>
      </div>
  </div>
</template>

<script>
import AddEditStock from './AddEditStock'
import Delete  from 'components/common/Delete.vue'

export default {
name: 'FindStock',

components:{
    AddEditStock,
    Delete
},
    data() {
      return {
        tableData: [],
        title:'',
         DialogVisible: false,
         addedit:'',
         dshow: true,
         delname:'',
         did: 0,
      }
    },
    methods: {
        //全查询
     getAllStock(){
       const self=this;
       self.$http.post('/api/stock/findGetStock').then((result)=>{
         //console.log("result===="+JSON.stringify(result.data));
         this.tableData=result.data;
      })
     },
       //修改时间格式
      dataFormat: function(row,column){
      let data = row[column.property]
      if (data ===null) {
        return ''
       }
     let date = new Date(data)
     return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      },
      //修改
      handleEdit(index, row) {
        this.DialogVisible=true;
        this.title="修改";
        this.dshow=true;
        this.addedit="修改";
        let id=this.tableData[index].stockid
       
        this.did=id;
      },
      //删除
      handleDelete(index, row) {
        this.DialogVisible=true;
        this.title="删除";
        this.dshow=false;
        this.delname="进货";
        let id=this.tableData[index].stockid
      //  console.log("id==="+id)
        this.did=id;
      },
      indexMethod(index) {
        
        return index * 2;
      },
      //添加
      addVisible(){
      this.DialogVisible=true;
      this.title="添加";
      this.dshow=true;
      this.addedit="添加";
      this.did=0;
      },
      closeAdd(){
           this.DialogVisible=false;
      }
    },
    mounted(){
        this. getAllStock();
        this.closeAdd();
    }
}
</script>

<style>
.buttons{
  margin-bottom: 10px;
}
</style>