<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
      <el-breadcrumb-item><i class="el-icon-edit"></i>出货管理</el-breadcrumb-item>
      <el-breadcrumb-item>出货查找</el-breadcrumb-item>
      </el-breadcrumb>
   	</div>
        <div class="buttons">
      <el-button type="primary" icon="el-icon-edit" size="small"  @click="addVisible">添加</el-button>
    </div>
     <el-table :data="tableData" style="width: 100%" border>
    <el-table-column label="编号" type="index" :index="indexMethod"  width="90"></el-table-column>
    <el-table-column prop="stockname" label="出货名称" width="100"></el-table-column>
    <el-table-column prop="delivernum" label="出货数量" width="100"></el-table-column>
    <el-table-column prop="deliverprice" label="出货价格"  width="100"></el-table-column>
     <el-table-column prop="deliverdate" label="进货日期" :formatter="dataFormat" width="180"></el-table-column>
     <el-table-column prop="receive" label="接收人"  width="120"></el-table-column>
     <el-table-column prop="handle" label="经手人"  width="120"></el-table-column>
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
   <!-- 添加修改 -->
   <AddEditDeliver :addedit="addedit" v-if="dshow" :did="did" v-on:DialogVisible="closeAdd"></AddEditDeliver>

     <!--  删除 -->
        <Delete v-on:DialogVisible="closeAdd" v-if="!dshow" :delname="delname" :did="did"></Delete>
  </el-dialog>
 </div>
  </div>
  
</template>

<script>
 import AddEditDeliver from './AddEditDeliver' 
 import Delete  from 'components/common/Delete.vue'

export default {
  name: 'findDeliver',
  data(){
    return{
      tableData:[],
      title:'',
      DialogVisible:false,
      dshow: true,
      addedit: '',
      did:0,
      delname:'',
    }
   },
    components:{
        AddEditDeliver,
        Delete
    },
    methods:{
      indexMethod(index) {
        
     return index * 2;
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

      //全查询
      getAllDeliver(){
          const self=this;
          self.$http.post('/api/deliver/findAllDeliver').then((result)=>{
            //  console.log(JSON.stringify(result))
           this.tableData = result.data;
          })
      },
      //添加操作
      addVisible(){
      this.DialogVisible=true;
      this.title="添加";
      this.dshow=true;
      this.addedit="添加";
      this.did=0;
      },
       //修改
      handleEdit(index, row) {
        this.DialogVisible=true;
        this.title="修改";
        this.dshow=true;
        this.addedit="修改";
        let id=this.tableData[index].did
        this.did =id;
      },
       //删除
      handleDelete(index, row) {
        this.DialogVisible=true;
        this.title="删除";
        this.dshow=false;
        this.delname="出货";
        let id=this.tableData[index].did
      //  console.log("id==="+id)
        this.did=id;
      },
      //关闭
      closeAdd(){
          this.DialogVisible =false;
      }
  },
  mounted(){
      this.getAllDeliver();
  }
  
}
</script>

<style>
  .buttons{
  margin-bottom: 10px;
}
</style>