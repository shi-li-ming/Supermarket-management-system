<template>
  <div class="dcenter">
  <p>请问是否确定删除当前数据?</p>
  <!-- <p>数字==={{did}}--{{index}}---{{}}</p> -->
  <span slot="footer" class="dialog-footer">
      <br><br>
    <el-button @click="noVisible">取 消</el-button>
    <el-button type="primary" @click="deleteVisible">确 定</el-button>
  </span>

  </div>
</template>

<script>
export default {
name: 'Delete',
//父组件值传子组件
props:{did:Number,
  delname:String},
data() {
      return {
        centerDialogVisible: false,
        DialogVisible: false,
        index: this.did,
      };
    },
    methods:{
       deleteVisible(){
              const self=this;
          //     this.$emit('DialogVisible',this.DialogVisible);
          //       this.$message({message:'成功',type:'success'})
          //      self.$http.post('/api/user/deleteuser', {id: this.index}).then((res)=>{
          //     console.log(response);
          //   	self.$router.push('/finduser');
          //   }).then((err)=>{
          //     console.log(err);
          //  })
          if(this.delname==="分类"){
           // console.log(this.delname)
           self.$http.post('/api/cate/deleteCate',{id:this.index}).then((result)=>{ 
            // console.log(JSON.stringify(result))
             if(result.status===200){
              this.$message({message:'成功',type:'success'});
              this.$emit("DialogVisible",this.DialogVisible);
             setTimeout(() => {
               window.location.href="http://localhost:8086/findcategory";
             }, 1000);
             }
             else{
               this.$message({
               showClose:true,
               message:'错误',
               type: 'error'})
             }
             
           })
          }
          else if(this.delname==="用户"){
           self.$http.post('/api/user/deleteuser',{id:this.index}).then((result)=>{
           if(result.status===200){
              this.$message({message:'成功',type:'success'});
              this.$emit("DialogVisible",this.DialogVisible);
             setTimeout(() => {
               window.location.href="http://localhost:8086/finduser";
             }, 500);
             }
             else{
               this.$message({
               showClose:true,
               message:'错误',
               type: 'error'})
             }
           })
          }
          else if(this.delname ==="商品"){
           self.$http.post('/api/shop/deleteShop',{id:this.index}).then((result)=>{
            if(result.status===200){
              this.$message({message:'成功',type:'success'});
              this.$emit("DialogVisible",this.DialogVisible);
             setTimeout(() => {
               window.location.href="http://localhost:8086/findShop";
             }, 500);
             }
             else{
               this.$message({
               showClose:true,
               message:'错误',
               type: 'error'})
             }
           })
          }
          else if(this.delname === "进货"){
           // alert("进货")
            self.$http.post('/api/stock/deleteStock',{id:this.index}).then((result)=>{
            if(result.status===200){
              this.$message({message:'成功',type:'success'});
              this.$emit("DialogVisible",this.DialogVisible);
             setTimeout(() => {
               window.location.href="http://localhost:8086/findStock";
             }, 500);
             }
             else{
               this.$message({
               showClose:true,
               message:'错误',
               type: 'error'})
             }
           })
          }
          else if(this.delname === "出货"){
              //alert("出货")
              self.$http.post('/api/deliver/deleteDeliver',{id:this.index}).then((result)=>{
            if(result.status===200){
              this.$message({message:'成功',type:'success'});
              this.$emit("DialogVisible",this.DialogVisible);
             setTimeout(() => {
             window.location.href="http://localhost:8086/findDeliver";
             }, 500);
             }
             else{
               this.$message({
               showClose:true,
               message:'错误',
               type: 'error'})
             }
           })
          }
          } ,
          noVisible(){
            this.$emit('DialogVisible',this.DialogVisible);
          }
    },
    //    watch:{
    //  uid(index,did){
    //    this.index=this.did
    //  }
    // }
   
}
</script>

<style>
.dcenter{
    text-align: center;
}
.dialog-footer{
    margin: 10px;
}
</style>