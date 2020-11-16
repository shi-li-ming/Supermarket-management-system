<template>
<div>
  <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>查询用户</el-breadcrumb-item>
            </el-breadcrumb>
		</div>
    <div class="userContent" >
      <div class="buttons">
      <el-button type="primary" icon="el-icon-edit" size="small"  @click="dialogVisible">添加</el-button>
      </div>
     
    <el-table :data="tableData" ref="multipleTable" tooltip-effect="dark"
    style="width: 100%"  @selection-change="handleSelectionChange" border>
    <el-table-column  type="selection" width="55"> </el-table-column>
     <el-table-column label="编号" type="index" :index="indexMethod"  width="90"></el-table-column>
    <el-table-column prop="username" label="用户名称" width="100"> </el-table-column>
     <el-table-column prop="password" label="密码" width="70"></el-table-column>
     <el-table-column prop="sex" label="性别"  width="70"></el-table-column>
    <el-table-column  prop="account"  label="账号名称" width="100"></el-table-column>
     <el-table-column prop="repeatPass" label="确认密码" width="100"> </el-table-column>
     <el-table-column prop="email"  label="邮箱" width="160"> </el-table-column>
     <el-table-column prop="phone"  label="电话" width="130"></el-table-column>
     <el-table-column prop="card" label="身份证号" width="180"> </el-table-column>
     <el-table-column :formatter="dataFormat" prop="birth" label="出生日期"  width="120"></el-table-column>
     <el-table-column label="操作"  width="140">
    <template slot-scope="scope">
        <el-button size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
<div>
  <!-- 分页 -->
  <!-- <Page></Page> -->
</div>
  <!-- 添加 -->
 <div>
 <el-dialog :title="title" :visible.sync="DialogVisible" :width="dwith" center>
 
    <!-- 用户添加修改组件 -->
    <AddEditUser v-on:DialogVisible="closemain" v-if="dshow"  :did="did" :editadd="editadd"></AddEditUser>
    <!-- 删除组件 -->
    <Delete v-on:DialogVisible="delmain" v-if="!dshow"  :did="did" :delname="delname"></Delete>

  
  </el-dialog>
 </div>
</div>
</template>
<script>
import Page from 'components/common/Page.vue'
import AddEditUser from 'components/page/user/AddEditUser.vue'
import Delete  from 'components/common/Delete.vue'
  export default {
    data() {
      return {
        tableData: [],
         multipleSelection: [],
         DialogVisible: false,
          title: "",
           //修改或添加
          editadd: '',
          dwith: {
            type:String,
            default: ''
          },
          did: 0,
        //  是否显示组件
         dshow: true,
         delname: ''
      }
    },
    components:{
      Page,
      AddEditUser,
      Delete
    },
    methods: {
      indexMethod(index) {
        
     return index * 2;
      },
      gettableData(){
        const self = this;	
        self.$http.post("/api/user/finduser").then((response)=>{
        //console.log(response);
        this.tableData=response.data;
        })
      },
     handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //编辑
        handleEdit(index, row) {
        this.title="编辑",

        this.DialogVisible=true,
        this.dshow=true,
        this.editadd="编辑"
        var id=this.tableData[index].id;
       // console.log("did===="+id);
        this.did=id;
      },
      // 删除操作
      handleDelete(index, row) {
        this.title="删除",
        this.DialogVisible=true
        this.dshow= false
        this.dwith='10%';
        var id=this.tableData[index].id;
        // console.log("id===="+this.did);
         this.did=id;
         this.delname="用户";
      },
      //修改时间格式
      dataFormat: function(row,column){

         let data = row[column.property]
        /// console.log("日期"+JSON.stringify(column))
        // console.log("日期"+data)
      if (data ===null) {
        return ''
       }
     let dt = new Date(data)
      // console.log("dt"+dt);
     return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
      },
     dialogVisible: function() {
         this.title="添加",
         this.DialogVisible = true
          this.dshow=true
          this.dwith='30%',
          this.editadd="添加",
          this.did=0;
      },
      // 关闭对话框
      closemain(val){
        this.DialogVisible=val;
         //console.log( "=====dis==="+ this.DialogVisible)
      },
      delmain(val){
        console.log("val===="+val)
      this.DialogVisible=val;
      //console.log( "=====dia==="+ this.DialogVisible)
      }
    },
    
    //初始化
    mounted() {
     this.gettableData();
     this.closemain();
     this.delmain();
    }
    //

    }
</script>
<style>
.userContent {
		margin: 0 auto;
	}
.buttons {
  padding: 0px;
  margin-bottom: 10px;
  }
</style>
