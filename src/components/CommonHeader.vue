<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
        style="color: #94618e;"
      ></el-button>
      <div class="text">
        <el-breadcrumb separator="|">
          <el-breadcrumb-item
            v-for="item in tags"
            :key="item.path"
            :to="{ path: item.path }"
            style="color: '#fff'"
            >{{ item.label }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick" >
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/user.jpg" />
        </span>
        <el-dropdown-menu slot="dropdown" class="dropdownProp">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";

import {resetRouter} from '../router'
export default {
  data() {
    return {};
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    handleClick(command) {
      if (command === "logout") {
        //清除cookie中的token
        Cookie.remove("token");
        //清除cookie中的menu
        Cookie.remove("menu")
        //还原路由
        resetRouter();

        this.$router.push("/login");
        this.$store.commit("reset_state")

      }
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/common.less");
.header-container {
  padding: 0 20px;
  background-color: #49274a;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .l-content {
    display: flex;
    align-items: center;
    .el-button{
      border:solid #fff 1px;
      background-color: #fff;
    }
    .text {
      font-size: 14px;
      margin-left: 15px;
      /deep/.el-breadcrumb__item {
        .el-breadcrumb__inner {
          font-weight: 500;
          color: #94618e !important;
        }
        &:last-child {
          .el-breadcrumb__inner {
            color: #fff !important;
          }
        }
      }
      // /* 被选中时的颜色 */
      // .el-breadcrumb__item:last-child /deep/ .el-breadcrumb__inner {
      //   color: #fff !important;
      // }
    }
  }

  .r-content {
    .user {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }
}

.el-dropdown-menu__item :hover{
  background-color: #94618e   !important;
  color:#fff !important;
}
.dropdownProp{
  .el-dropdown-menu__item:hover{
    background-color: #94618e;
    color:#fff;
  }
}

</style>

