<template>
  <div>
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
 <el-form-item label="出货名称" prop="stockid">
   <el-select v-model="ruleForm.stockid" placeholder="请选择" style="width: 100%;" >
    <el-option
      v-for="item in stock"
      :key="item.stockid"
      :label="item.stockname"
      :value="item.stockid">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="出货数量" prop="delivernum">
    <el-input type="text" v-model.number="ruleForm.delivernum" ></el-input>
  </el-form-item>
  <el-form-item label="出货单价" prop="deliverprice">
    <el-input type="text" v-model.number="ruleForm.deliverprice" ></el-input>
  </el-form-item>
 <el-form-item label="进货日期" prop="deliverdate">
    <el-date-picker
      v-model="ruleForm.deliverdate"
      type="date"
      placeholder="选择日期"
       style="width: 100%;"
       format="yyyy-MM-dd "
      value-format="yyyy-MM-dd">
    </el-date-picker>
  </el-form-item>
   <el-form-item label="接收人" prop="receive">
    <el-input type="text" v-model="ruleForm.receive" ></el-input>
  </el-form-item>
   <el-form-item label="经手人" prop="handle">
    <el-input type="text" v-model="ruleForm.handle" ></el-input>
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
  name:'AddEditStock',
  props:{
  addedit:String ,
  did:Number
  },
  data() {
      var deliverknum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('出货数量不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 0) {
              callback(new Error('出货数量必须大于0'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return {
        stock:[],
        DialogVisible: false,
        index: this.did,
        ruleForm: {
          stockid: '',
          delivernum: '',
          deliverprice: '',
          receive: '',
          deliverdate: '',
          handle:''
        },
        rules: {
          stockname:[{required: true, message: '请输入进货名字', trigger: 'blur'}],
          deliverknum: [{required: true, validator: deliverknum, trigger: 'blur' }],
        }
      };
    },
    methods: {
       //出货查询
     getAllStock(){
       const self=this;
      self.$http.post('/api/stock/findGetStock').then((result)=>{
         //console.log("result===="+JSON.stringify(result.data));
         this.stock=result.data;
      })
   },
    //单查询
    getByOneDeliver(){
        const self=this;
        self.$http.post('api/deliver/findByOneDeliver',{id: this.did}).then((result)=>{
          let data=result.data[0];
         // console.log("result===="+JSON.stringify(data));
          self.ruleForm.stockid = data.stockid;
         self.ruleForm.delivernum = data.delivernum;
         self.ruleForm.deliverprice = data.deliverprice;
         self.ruleForm.receive = data.receive;
         self.ruleForm.deliverdate = new Date(data.deliverdate);
         self.ruleForm.handle = data.handle;
        })
    },
    //提交操作
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
         const self=this;
          if (valid) {
              if(this.addedit === "添加"){
                  self.$http.post('/api/deliver/addDeliver',this.ruleForm).then((result)=>{
                  //console.log(JSON.stringify(result))
                  if(result.status === 200){
                  this.$message({message:'成功',type:'success'});
                  this.$emit('DialogVisible',this.DialogVisible);
                  //http://localhost:8086/findStock
                 setTimeout(() => {
                 window.location.href="http://localhost:8086/findDeliver";
                 }, 500);
                 }
                 else{
                 this.$message({message:'失败',type:'error'})
                 }
                 })
                }
                else if(this.addedit === "修改"){
                    let fordata= {
                       id: this.index,
                       stockid: self.ruleForm.stockid ,
                       delivernum: self.ruleForm.delivernum ,
                       deliverprice:self.ruleForm.deliverprice ,
                       receive:self.ruleForm.receive ,
                       deliverdate: self.ruleForm.deliverdate ,
                       handle: self.ruleForm.handle
                    }
                  self.$http.post('/api/deliver/updateDeliver', fordata).then((result)=>{
                  //console.log(JSON.stringify(result))
                  if(result.status === 200){
                  this.$message({message:'成功',type:'success'});
                  this.$emit('DialogVisible',this.DialogVisible);
                  //http://localhost:8086/findStock
                   setTimeout(() => {
                    window.location.href="http://localhost:8086/findDeliver";
                   }, 500);
                 }
                 else{
                 this.$message({message:'失败',type:'error'})
                 }
                 })
                }
           
            }   else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
        this.getAllStock();
        this.getByOneDeliver();
    },
       watch:{
       did:function(a,b){
       this.did=a;
      if(a==0){
        this.ruleForm={
           stockid: '',
          delivernum: '',
          deliverprice: '',
          receive: '',
          deliverdate: '',
          handle:''
        }
        return;
      }
      //单查询
      this.getByOneDeliver();
    }
  }
}
</script>

<style>

</style>