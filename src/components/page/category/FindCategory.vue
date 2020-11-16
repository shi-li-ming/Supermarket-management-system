<template>
<div>
   <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit"></i>分类管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类查询</el-breadcrumb-item>
            </el-breadcrumb>
		</div>
    <div class="buttons">
      <el-button type="primary" icon="el-icon-edit" size="small"  @click="addVisible">添加</el-button>
    </div>
   <el-table
    ref="multipleTable"
    border
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <template slot="empty"></template>
    <el-table-column label="编号" type="index" :index="indexMethod"  width="90"></el-table-column>
    <el-table-column prop="cname" label="类别" width="120">
    </el-table-column>
    <el-table-column prop="descs" label="描述" show-overflow-tooltip></el-table-column>
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
  <!-- 添加修改操作 -->
  <el-dialog :title="title" :visible.sync="DialogVisible" width="30%" center>
    <!-- //添加组件 -->
  <AddEdit v-on:DialogVisible="closeAdd" v-if="dshow" :did="did" :delname="delname"></AddEdit>
    <!--  删除 -->
  <Delete v-on:DialogVisible="closeAdd" v-if="!dshow" :delname="delname" :did="did"></Delete>
  </el-dialog>
   </div>
</div>
 
</template>

<script>
import AddEdit from 'components/page/category/AddEdit.vue';
import Delete  from 'components/common/Delete.vue'
export default {
  name: 'FindCategory',
  data(){
    return{
     tableData: [],
       DialogVisible: false,
       title:'',
       //标识id
       did: 0,
       //操作识别
       delname:'',
       //是否显示
       dshow:true

    }
  },
 components:{
    AddEdit,
    Delete
  },
  methods:{
    indexMethod(index) {
        
     return index * 2;
      },
     handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    getCategory(){
      const self=this;
      self.$http.post('/api/cate/findAllCate').then((result)=>{
         //console.log("result===="+JSON.stringify(result));
         this.tableData=result.data;
      })
    },
    //添加操作
   addVisible(){
   this.DialogVisible=true,
   this.title="添加";
   this.dshow=true;
   this.delname="添加";
   this.did=0;
   },
    //关闭添加
    closeAdd(val){
      this.DialogVisible=val;
    },
    //修改
    handleEdit(index, row) {
        //console.log(index, row);
        this.DialogVisible=true;
        this.title="修改";
        this.dshow=true;
        this.delname="修改";
        let id=this.tableData[index].cid;
        this.did=id;
       // console.log("did==="+JSON.stringify(id));
      },
    //删除
    handleDelete(index, row) {
        //console.log(index, row);
        this.DialogVisible=true;
        this.title="删除";
        this.dshow=false;
        let id=this.tableData[index].cid;
        this.delname="分类";
        this.did=id;
        //console.log("did"+JSON.stringify(did));
      }
  },

 mounted(){
 this.getCategory();
  }
}
</script>

<style>
.buttons{
  margin-bottom: 10px;
}
</style>