<template>
  <div>
       <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit"></i>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品查找</el-breadcrumb-item>
            </el-breadcrumb>
		</div>
    <div class="buttons">
      <el-button type="primary" icon="el-icon-edit" size="small"  @click="addVisible">添加</el-button>
    </div>
 <el-table  ref="multipleTable" :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange">
     <el-table-column type="selection" width="55"> </el-table-column>
     <el-table-column label="编号" type="index" :index="indexMethod"  width="90"></el-table-column>
    <el-table-column prop="stockname" label="商品名称" width="100"></el-table-column>
    <el-table-column prop="sellprice" label="售价" width="80"></el-table-column>
    <el-table-column prop="saleprice" label="促销价" width="90"></el-table-column>
    <el-table-column prop="snum" label="库存" width="90"></el-table-column>
    <el-table-column prop="salenumprice" label="库存总金额" width="110"></el-table-column>
    <el-table-column prop="sellnumprice"  label="销售总金额" width="110"></el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope" width="180">
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
  <el-dialog :title="title"   :visible.sync="DialogVisible" width="30%">
    <!-- 添加修改操作 -->
    <AddEditShop :editadd="editadd" v-if="dshow" v-on:DialogVisible="closemain" :did="did" :disabled="disabled"></AddEditShop>
     <!--  删除 -->
   <Delete v-on:DialogVisible="closemain" v-if="!dshow" :delname="delname" :did="did"></Delete>
   </el-dialog>
  </div>
</template>

<script>
import AddEditShop from  './AddEditShop.vue'
import Delete  from 'components/common/Delete.vue'
export default {
  name: 'FindShop',
    data() {
      return {
        tableData: [],
         multipleSelection: [],
         DialogVisible: false,
         title: "",
         //标识操作
         editadd:'',
         //标识显示组件
         dshow:true,
         delname:'',
         did: 0,
         disabled: false,
         shopnum:'',
      }
    },
    components:{
        AddEditShop,
        Delete
    },
    computed:{
     snum(){
       return snum+=this.shopnum
     }
    },
    methods:{
      indexMethod(index) {
        
     return index * 2;
      },
     
     //查询所有数据
       getAllShop(){
       const self=this;
       self.$http.post('/api/shop/findAllShop').then((result)=>{
           //  console.log(JSON.stringify(result))
             this.tableData=result.data;
             this.shopnum =result.data[0].stocknum;
             console.log(this.shopnum)
       })
      },
    //添加
    addVisible(){
      this.DialogVisible=true,
      this.title="添加",
      this.editadd="添加",
      this.dshow=true
      this.did = 0
    },
    //修改
     handleEdit(index, row) {
       // console.log(index, row);
        this.DialogVisible=true;
        this.title="修改";
        this.editadd="修改";
        this.dshow=true;
        let id=this.tableData[index].sid;
        this.disabled=true
      //  console.log("id==="+id)
        this.did=id;
    },
    //删除
      handleDelete(index, row) {
       // console.log(index, row);
        this.DialogVisible=true;
        this.title="删除";
        this.dshow=false;
        this.delname="商品";
        let id=this.tableData[index].sid
       // console.log("id==="+id)
        this.did=id;
      },
     handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //关闭对话框
      closemain(){
      this.DialogVisible=false
      }
    },  
    
    mounted(){
     // this.handleEdit();
        this.getAllShop();
        //调用关闭对话框
        this.closemain();
    }
    
}
</script>

<style>
.buttons{
  margin-bottom: 10px;
}
</style>