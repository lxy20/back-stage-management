<template>
  <div>
    <el-container style="height:100vh;">
      <el-aside width="auto">
        <common-aside/>
      </el-aside>
      <el-container >
        <el-header>
          <common-header></common-header>
        </el-header>
        <common-tag/>
        <el-main style="height:80vh; margin-top:20px; padding-top:0">
            <!-- 路由出口 -->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue';
import CommonTag from '../components/CommonTag.vue'
export default {
    data(){
        return {}
    },
    components:{
        CommonAside,
        CommonHeader,
        CommonTag
    },
    mounted() {
      
    },
};
</script>

<style scoped>
.el-header{
  padding: 0;
}

.el-container{
  background-color: #E7DFDD;
}




</style>