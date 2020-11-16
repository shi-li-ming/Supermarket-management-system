<template>
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-change="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="20">
    </el-pagination>
  </div>
</template>

<script>
export default {
data(){
  return {
    currentPage:1,//初始页
    pageSize:2, //每页的数据
    userList:[]
  }
},
methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage=val
        console.log('当前页:'+this.currentPage);
         console.log('this.pageSize:=='+this.pageSize);
        const self=this;
        let fordata={currentpage: this.currentPage,pageSize:this.pageSize};
         console.log("fordata===="+JSON.stringify(fordata))
         self.$http.post('/api/user/findbypage',fordata).then((res)=>{
         console.log("res==="+JSON.stringify(res))
        })
      }
},
 mounted() {
   this.handleCurrentChange();
 }
}
</script>

<style>

</style>