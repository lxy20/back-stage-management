<template>
  <el-menu
    default-active="home"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#94618E"
    text-color="#fff"
    active-text-color="#49274a "
  >
    <h3 style="color:#fff">{{ isCollapse?'&nbsp;':"后台管理系统"}}</h3>
    <el-menu-item  v-for="item in noChildren" :key="item.name" :index="item.name" @click="clickMenu(item)" >
      <i :class="`el-icon-${item.icon}`" ></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label" >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`" ></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group  v-for="subItem in item.children" :key="subItem.path" >
        <el-menu-item :index="subItem.path" @click="clickMenu(subItem)">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {  
      

    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
        if(this.$route.path != (item.path) && !(this.$route.path ==='/home' && (item.path === '/'))){
            this.$router.push(item.path)
        }
        this.$store.commit('selectMenu',item)
    }

  },
  computed: {    menuData(){
      //判断当前数据，若缓存中没有去store中获取
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    },
    //没有子菜单
    noChildren(){
        return this.menuData.filter(item => !item.children)
    },
    //有子菜单
    hasChildren(){
        return this.menuData.filter(item => item.children)
    },
    isCollapse(){
        return this.$store.state.tab.isCollapse

    }
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 140px;
  
}
.el-menu{
    height: 100vh;
    border-right: 0;
    transition: all 10ms;

    h3{
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 18px;
        font-weight: 800;
}
}
[class*="icon"]{
 	color:#fff;
 }

.el-submenu .el-menu-item {
  min-width:100%;

 }

</style>