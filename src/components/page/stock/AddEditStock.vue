<template>
  <div>
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
  <el-form-item label="进货名字" prop="stockname">
    <el-input type="text" v-model="ruleForm.stockname" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="进货数量" prop="stocknum">
    <el-input type="text" v-model.number="ruleForm.stocknum" ></el-input>
  </el-form-item>
  <el-form-item label="进货单价" prop="stockprice">
    <el-input type="text" v-model.number="ruleForm.stockprice" ></el-input>
  </el-form-item>
   <el-form-item label="类别" prop="cid">
     <el-select v-model="ruleForm.cid" placeholder="请选择"  style="width: 100%;">
    <el-option
      v-for="item in options"
      :key="item.cid"
      :label="item.cname"
      :value="item.cid">
    </el-option>
  </el-select>
  </el-form-item>
 <el-form-item label="进货日期" prop="stockdate">
    <el-date-picker
      v-model="ruleForm.stockdate"
      type="date"
      placeholder="选择日期"
       style="width: 100%;"
      format="yyyy-MM-dd "
      value-format="yyyy-MM-dd">
    </el-date-picker>
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
      var stocknum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('进货数量不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 0) {
              callback(new Error('进货数量必须大于0'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return {
        options:[],
        DialogVisible: false,
        index: this.did,
        ruleForm: {
          stockname: '',
          stocknum: '',
          stockprice: '',
          cid: '',
          stockdate: ''
        },
        rules: {
          stockname:[{required: true, message: '请输入进货名字', trigger: 'blur'}],
          stocknum: [{required: true, validator: stocknum, trigger: 'blur' }],
        }
      };
    },
    methods: {
        //查询类别
     getCategory(){
      const self=this;
      self.$http.post('/api/cate/findAllCate').then((result)=>{
         //console.log("result===="+JSON.stringify(result));
         this.options=result.data;
      })
    },
    //单查询
    getByOneStock(){
        const self=this;
        self.$http.post('api/stock/findByOneStock',{id: this.did}).then((result)=>{
          let data=result.data[0];
          console.log("result===="+JSON.stringify(data));
          self.ruleForm.stockname = data.stockname;
         self.ruleForm.stocknum = data.stocknum;
         self.ruleForm.stockprice = data.stockprice;
         self.ruleForm.cid = data.cid;
         self.ruleForm.stockdate = data.stockdate;
        })
    },
    //提交操作
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
         const self=this;
          if (valid) {
              if(this.addedit === "添加"){
                  self.$http.post('/api/stock/addStock',this.ruleForm).then((result)=>{
                  console.log(JSON.stringify(result))
                  if(result.status === 200){
                  this.$message({message:'成功',type:'success'});
                  this.$emit('DialogVisible',this.DialogVisible);
                  //http://localhost:8086/findStock
                 setTimeout(() => {
                 window.location.href="http://localhost:8086/findStock";
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
                       stockname: self.ruleForm.stockname ,
                       stocknum: self.ruleForm.stocknum ,
                       stockprice:self.ruleForm.stockprice ,
                       cid:self.ruleForm.cid ,
                       stockdate: self.ruleForm.stockdate 
                    }
                  self.$http.post('/api/stock/updateStock', fordata).then((result)=>{
                  //console.log(JSON.stringify(result))
                  if(result.status === 200){
                  this.$message({message:'成功',type:'success'});
                  this.$emit('DialogVisible',this.DialogVisible);
                  //http://localhost:8086/findStock
                   setTimeout(() => {
                    window.location.href="http://localhost:8086/findStock";
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
        this.getCategory();
        this.getByOneStock();
    },
     watch:{
       did:function(a,b){
      this.did=a;
      if(a==0){
        this.ruleForm={
          stockname: '',
          stocknum: '',
          stockprice: '',
          cid: '',
          stockdate: ''
        }
        return;
      }
      //单查询
        this.getByOneStock();
    }
  }
}
</script>

<style>

</style>