<template>
  <div class="tabs">
    <el-tag
      v-for="(item,index) in tags"
      :key="item.path"
      :closable ="item.name !=='home'  "
      :effect= "$route.name === item.name?'dark':'plain'"
      color="#94618E "
      @click = "changeMenu(item)"
      @close = "handleClose(item, index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default {
    name: "CommonTag",
    data(){
        return{}
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabList
        }),

    },
    methods: {
        ...mapMutations(['closeTag']),
        //点击tag跳转
        changeMenu(item){
        this.$router.push({name :item.name})
        },
        //点击tag删除
        handleClose(item, index){
            const lastIndex =this.tags.length -1
            //调用store中的mutation
            this.closeTag(item)
            if (item.name != this.$route.name){
                return
            }
            if (index != lastIndex){
                this.$router.push({name: this.tags[index].name})
            }else{
                this.$router.push({name: this.tags[lastIndex-1].name})
            }

        }
    },
};
</script>

<style lang="less" scoped>
.tabs{
    padding: 20px ;
    padding-bottom: 0;
    .el-tag{
        margin-right: 10px;
        border :none;
        font-weight: 500;
       &.el-tag--plain{
            color: #49274a  ;
        }
        }
        &.el-tag--dark{
            color:#fff  ;
        }
    
}



/deep/ .el-tag--plain .el-tag__close {
    color: #49274a  ;
}
/deep/ .el-tag--plain .el-tag__close:hover {
    background-color: #fff  ;
}
/deep/ .el-tag--dark .el-tag__close:hover {
    background-color: #fff  ;
    color: #94618e  ;
}



</style>