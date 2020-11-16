<template>
<div>
 <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名称" prop="username">
    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="用户密码" prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="用户密码" prop="repeatPass">
    <el-input type="text" v-model="ruleForm.repeatPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="性别" prop="sex">
   <el-select v-model="ruleForm.sex"  style="width: 100%;" placeholder="性别">
      <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
    </el-select>
  </el-form-item>

   <el-form-item label="用户账号" prop="account">
    <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
   <el-input type="text" v-model="ruleForm.email"></el-input>
 </el-form-item>
  <el-form-item label="电话" prop="phone">
   <el-input type="text" v-model.number="ruleForm.phone"></el-input>
 </el-form-item>
  <el-form-item label="身份证号" prop="card">
   <el-input type="text" v-model.number="ruleForm.card"></el-input>
 </el-form-item>
  <el-form-item label="出生日期" prop="birth">
    <el-date-picker
      v-model="ruleForm.birth"
      type="date" 
      style="width: 100%;"
      placeholder="选择日期">
    </el-date-picker>
 </el-form-item>
  <el-form-item>
     <el-button type="primary" :plain="true" @click="submitForm('ruleForm')">提交</el-button>
    <!-- <el-button type="primary" :plain="true" @click="submitForm('ruleForm')">提交</el-button> -->
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import utils from '../../../utils/utils';
export default {
  props:{
    editadd: String,
    did:Number
  },
  data() {
      
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.repeatPass !== '') {
            this.$refs.ruleForm.validateField('repeatPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var phone=(rule,value,callback)=>{
        if(value ===''){
          callback(new Error('请输入手机号'));
        }
        else if(!utils.phoneReg.test(this.ruleForm.phone)){
          	callback(new Error('请输入正确的手机号'));
        }else {
					callback();
				}
      };
      var email=(rule,value,callback)=>{
        if(value===''){
          callback(new Error('请输入邮箱'));
        }
        else if(!utils.emailReg.test(this.ruleForm.email)){
          	callback(new Error('请输入正确的邮箱'));
        }
        else {
					callback();
				}
      };
      var card=(rule,value,callback)=>{
     if (value === '') {
					callback(new Error('请输入身份证号'));
				} else if (!utils.idCardReg.test(this.ruleForm.card)){
					callback(new Error('请输入正确的身份证号'));
				} else {
					callback();
				}
      }
      return {
        DialogVisible: false,
        dshow:false,
        index: this.did,
        ruleForm: {
          username: '',
          password: '',
          repeatPass:'',
          sex: '',
          account: '',
          email: '',
          phone:'',
          card:'',
          birth:''
        },
        rules: {
          username:[{
            required: true, message: '请输入用户名称', trigger: 'blur'
          }],
          password: [
            {  required: true,validator: validatePass, trigger: 'blur' }
          ],
          repeatPass: [
            {  required: true,validator: validatePass2, trigger: 'blur' }
          ],
          phone:[{
            required:true,validator:phone, trigger: 'blur'}
            ],
          email:[{
            required:true,validator:email, trigger: 'blur'}
            ],
         card:[{
            required:true,validator:card, trigger: 'blur'}
            ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        const self = this;	
        self.$refs[formName].validate((valid) => {
          if (valid) {
            let editadds=this.editadd
            if(editadds==="添加"){
            console.log("editadds==="+editadds)
            ///api/user/addUser'
           self.$http.post('/api/user/addUser',self.ruleForm).then((response)=>{
           //  console.log("res====="+JSON.stringify(response));
            // console.log("status====="+response.status);
            if(response.status===200){
               this.$emit('DialogVisible',this.DialogVisible);
              console.log(response);
              this.$message({message:'成功',type:'success'})
             setTimeout(() => {
              window.location.href="http://localhost:8086/finduser";
             }, 500);
            }
            else{
                this.$message({message:'错误',type:'error'})
             }
           }).then((err)=>{
              console.log(err);
           })
          }
          else if(editadds==="编辑"){
           //console.log("editadds==="+editadds)
           let formData = {
             id: this.index,
             username: self.ruleForm.username,
             password: self.ruleForm.password,
					   email: self.ruleForm.email,
				    	phone: self.ruleForm.phone,
				    	card: self.ruleForm.card,
				    	birth: self.ruleForm.birth,
              sex: self.ruleForm.sex,
              account:self.ruleForm.account,
              repeatPass:self.ruleForm.repeatPass,
              birth:self.ruleForm.birth
				};
           self.$http.post('/api/user/updateUser',formData).then((res)=>{
             console.log("resdata====="+JSON.stringify(res));
             if(res.status===200){
                this.$emit('DialogVisible',this.DialogVisible);
                //console.log(response);
                this.$message({message:'成功',type:'success'})
                setTimeout(() => {
               window.location.href="http://localhost:8086/finduser";
             }, 500);
             }
             else{
                this.$message({message:'错误',type:'error'})
             }
           })
          }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       //单查询
      	getUserData() {
        const self = this;	
        console.log("this.index==="+this.index)
			   self.$http.post('/api/user/findOne',{id:this.did}).then(function(response) {
				//	console.log(response);
          let result = response.data[0];
          //	console.log("result==="+JSON.stringify(result));
           self.ruleForm.username = result.username;
           self.ruleForm.password =result.password
					 self.ruleForm.repeatPass = result.repeatPass;
					 self.ruleForm.email = result.email;
					 self.ruleForm.phone = result.phone;
           self.ruleForm.card = result.card;
           self.ruleForm.account=result.account;
					 self.ruleForm.birth = new Date(result.birth);
          self.ruleForm.sex = result.sex;
				}).then(function(error) {
					console.log(error);
				})
			},		
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
 
    },
    mounted(){
    if(this.editadds=="修改"){
       this.getUserData();
    }
       
      
        
      },
       watch:{
       did:function(a,b){
        this.did=a;
        if(a==0){
          //初始化
          this.ruleForm={
          username: '',
          password: '',
          repeatPass:'',
          sex: '',
          account: '',
          email: '',
          phone:'',
          card:'',
          birth:''
          }
          return;
        }
      //单查询
       this.getUserData();
    }
  }
      
}
</script>

<style>

</style>