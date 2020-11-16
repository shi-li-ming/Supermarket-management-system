<template>
  <div>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

  <el-form-item label="类别" prop="cname">
    <el-input type="text" v-model="ruleForm.cname"></el-input>
  </el-form-item>
  <el-form-item label="描述" prop="descs">
    <el-input type="textarea" v-model="ruleForm.descs"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>

</el-form>

  </div>
</template>

<script>
export default {
 name: 'AddEdit',
 props:{
  delname:String,
  did: Number
 },
//  computed:{
//   index(){
//     return this.did
//   }
//  },
 data(){
   return {
     DialogVisible: false,
      index: this.did,
     ruleForm: {
          cname: '',
          descs: ''
        },
      rules:{
        cname:[ { required: true, message: '请输入类别名称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2到 5 个字符', trigger: 'blur' }
            ],
        descs: [
            { required: true, message: '请填写描述内容', trigger: 'blur' }
          ]
      }
   };
 },
 methods: {
      submitForm(formName) {
        // console.log("cid===="+JSON.stringify(this.cid))
        const self=this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.delname==="添加"){
             self.$http.post('/api/cate/addCate',this.ruleForm).then((result)=>{
            console.log(JSON.stringify(result))
           if(result.status===200){
            this.$emit('DialogVisible',this.DialogVisible);
             this.$message({
             message: '成功',
             type: 'success'
             });
             setTimeout(() => {
               window.location.href="http://localhost:8086/findcategory";
             }, 500);
            
           }
           else{
             this.$message({
             showClose: true,
             message: '错误',
            type: 'error'
        });
           }
            })
            }
            else if(this.delname==="修改"){
              let fordate={
                id: this.index,
                cname: self.ruleForm.cname,
                descs: self.ruleForm.descs
              }
            self.$http.post('/api/cate/updateCate',fordate).then((result)=>{
              if(result.status===200){
            this.$emit('DialogVisible',this.DialogVisible);
             this.$message({
             message: '成功',
             type: 'success'
             });
             setTimeout(() => {
               window.location.href="http://localhost:8086/findcategory";
             }, 500);
            
           }
           else{
             this.$message({
             showClose: true,
             message: '错误',
            type: 'error'
        });
           }
            })  
            }
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    getOneCate(){
    const self=this;
    //console.log("index===="+this.index)
    self.$http.post('/api/cate/getOneCate',{id: this.did}).then((result)=>{
       // console.log("result===="+JSON.stringify(result));
        //console.log("resultdata===="+JSON.stringify(result.data[0]));
        const data = result.data[0];
        self.ruleForm.cname = data.cname;
        self.ruleForm.descs = data.descs;
    }).then((err)=>{
      console.log(err)
    })
    }
},
    mounted(){
      if(this.delname=="修改"){
        this.getOneCate();
      }
     
    //console.log("mounted")
    },
       watch:{
       did:function(a,b){
       this.did=a;
      if(a==0){
        this.ruleForm={
           cname: '',
           descs: ''
        }
        return;
      }
      //单查询
      this.getOneCate();
    }
  }
}
</script>

<style>

</style>