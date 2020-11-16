<template>
  <div>
     <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="商品名称" prop="stockid">
   <el-select v-model="ruleForm.stockid" placeholder="请选择" style="width: 100%;" :disabled="disabled" >
    <el-option
      v-for="item in stock"
      :key="item.stockid"
      :label="item.stockname"
      :value="item.stockid">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="售价" prop="sellprice">
    <el-input type="text" v-model.number="ruleForm.sellprice" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="促销价" prop="saleprice">
    <el-input  type="text" v-model.number="ruleForm.saleprice"></el-input>
  </el-form-item>
   <el-form-item label="库存" prop="snum">
    <el-input type="text" v-model.number="ruleForm.snum" :disabled="true"></el-input>
  </el-form-item>
   <el-form-item label="库存总金额" prop="salenumprice">
    <el-input type="text" v-model.number="salenumprices"></el-input>
  </el-form-item>
   <el-form-item label="销售总金额" prop="sellnumprice">
    <el-input type="text" v-model.number="sellnumprices"></el-input>
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
  name:'AddEditShop',
  props:{
    editadd:String,
     did:Number,
     disabled:Boolean
  },
 
  data(){
     //设置属性
    var saleprice=(rule,value,callback)=>{
      if(value === " "){
        callback(new Error("请输促销价"));
      }
      if(this.ruleForm.saleprice >=  this.ruleForm.sellprice){
        callback(new Error("促销价必须小于售价"))
      }
      else{
        callback();
      }
    }
    return {
        stock:[],
        DialogVisible: false,
        index: this.did,
        //商品名称不可选
       // disabled: false,
        ruleForm: {
          stockid:'',
          sellprice:'',
          saleprice:'',
          snum:0,
          salenumprice: '',
          sellnumprice: ''
        },
       rules:{
         saleprice:[{ required:true,validator:saleprice, trigger: 'blur'}]
        }
        }
  },
  //计算属性
  computed:{
    //促销价
  salenumprices:{
    get() {
       return this.ruleForm.saleprice*this.ruleForm.snum;
    },
     set(val) {
     // console.log("vals==="+val)
    }
  },
  //售价
  sellnumprices(){
    return this.ruleForm.sellprice*this.ruleForm.snum;
  }
  },
  //响应点击事件
  methods:{
   //进货查询
   getAllStock(){
       const self=this;
      self.$http.post('/api/stock/findGetStock').then((result)=>{
         //console.log("result===="+JSON.stringify(result.data));
         this.stock=result.data;
      })
   },
   getOneshop(){
      const self=this;
       self.$http.post('/api/shop/findByOneShop',{id:this.did}).then((result)=>{
          let data=result.data[0];
         
            self.ruleForm.stockid = data.stockid;
            self.ruleForm.sellprice=data.sellprice;
            self.ruleForm.saleprice=data.saleprice;
            self.ruleForm.snum=data.snum;
            self.ruleForm.salenumprice=data.salenumprice;
            self.ruleForm.sellnumprice=data.sellnumprice;
           console.log(result);
          // this.ruleForm=result;

       })
  },
  //提交数据
  submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const self=this;
           if(this.editadd==="添加"){
            // alert("提交")
            let forData={
              stockid: self.ruleForm.stockid,
              sellprice: self.ruleForm.sellprice,
              saleprice: self.ruleForm.saleprice,
              snum: self.ruleForm.snum,
              salenumprice: self.salenumprices,
              sellnumprice: self.sellnumprices
            }
            //console.log("forData==="+JSON.stringify(forData))
            self.$http.post('/api/shop/addShop',forData).then((result)=>{
            // console.log(JSON.stringify(result))
            if(result.status===200){
              this.$message({message:'成功',type:'success'});
                 this.$emit('DialogVisible',this.DialogVisible);
              window.location.href="http://localhost:8086/findShop";
            }
            else{
              this.$message({message:'失败',type:'error'})
            }
            })
           }
           else if(this.editadd ==="修改"){
             let forData={
               id: this.did,
              sellprice: self.ruleForm.sellprice,
              saleprice: self.ruleForm.saleprice,
              snum: self.ruleForm.snum,
              salenumprice: self.salenumprices,
              sellnumprice: self.sellnumprices
            }
           self.$http.post('/api/shop/updateShop',forData).then((result)=>{
             if(result.status===200){
              this.$message({message:'成功',type:'success'});
              this.$emit('DialogVisible',this.DialogVisible);
              window.location.href="http://localhost:8086/findShop";
            }
            else{
              this.$message({message:'失败',type:'error'})
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
      }
  },
    mounted(){
    // alert(this.did);
      this.getAllStock();
      console.log("==="+this.editadd);
      if(this.editadd==="修改"){
       this.getOneshop();
      }else if(this.editadd==="添加"){
        //单查询
      
      }
     
  },
  watch:{
    did:function(a,b){
       console.log("新值"+this.did);
      this.did=a;
      if(a == 0) {
        this.ruleForm =  {
          stockid:'',
          sellprice:'',
          saleprice:'',
          snum:0,
          salenumprice: '',
          sellnumprice: ''
        }
        return;
      }
      
      //单查询
      // console.log("新值"+this.did);
      this.getOneshop();

    },
    
    deep: true,
    immediate: true
  }
}
</script>

<style>

</style>