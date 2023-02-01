<template>
  <div class="manage">
    <el-dialog
      title="填写信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 用户表单信息 -->
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        :rules="rules"
        label-width="80px"
        size="small"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.birth"
            value-format="yyyy-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="cancle"
          style="background-color: #94618e; border: none; color: #fff"
        >
          取 消
        </el-button>
        <el-button
          @click="submit"
          style="background-color: #94618e; border: none; color: #fff"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button
        size="small"
        @click="handleAdd"
        style="background-color: #fff; border: none; color: #94618e"
      >
        + 新增
      </el-button>
      <el-form :model="userForm" :inline="true" size="small">
        <el-form-item>
          <el-input v-model="userForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="onSubmit"
            style="background-color: #fff; border: none; color: #94618e"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="manage-table">
      <div class="table-part" style="height: 90%">
        <el-table
          :data="tableData"
          max-height="100%"
          size="small"
          style="width: 100%;display: flex; flex-direction: column;"
        >

          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="age" label="年龄"> </el-table-column>
          <el-table-column prop="birth" label="出生日期"> </el-table-column>
          <el-table-column prop="addr" label="地址" width="250px">
          </el-table-column>
          <el-table-column prop="/" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)"
                style="background-color: #f8eee7; border: none; color: #94618e"
                >编辑</el-button
              >
              <el-button
                size="mini"
                @click="handleDele(scope.row)"
                style="background-color: #fff; border: none; color: #94618e"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pages">
        <el-pagination
          layout="prev, pager, next"
          :total="this.total"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { addUser, delUser, editUser, getUser } from "../api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
          },
        ],
        age: [
          {
            required: true,
            message: "请输入年龄",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
          },
        ],
        birth: [
          {
            required: true,
            message: "请选择出生日期",
          },
        ],
        addr: [
          {
            required: true,
            message: "请输入地址",
          },
        ],
      },
      tableData: [],
      modalType: 0,
      total: 0,
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: "",
      },
    };
  },
  methods: {
    //提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //后续对表单数据的处理
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              this.getList();
            });
          }
          //清空
          this.$refs.form.resetFields();
          //关闭弹窗
          this.dialogVisible = false;
        }
      });
    },
    handleClose() {
      //清空
      this.$refs.form.resetFields();
      //关闭弹窗
      this.dialogVisible = false;
    },
    cancle() {
      this.handleClose();
    },
    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      //注意需要对当前数据进行深拷贝
      this.form = JSON.parse(JSON.stringify(row));
      console.log(this.form);
    },
    handleDele(row) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //重新获取列表
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    getList() {
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(
        ({ data }) => {
          this.tableData = data.list;
          this.total = data.count || 0;
        }
      );
    },
    handlePage(val) {
      this.pageData.page = val;
      this.getList();
    },
    //列表搜索
    onSubmit() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
@import url('../assets/css/common.less');

.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .manage-table {
    position: relative;
    height: 100%;
    .table-part{
      background-color: #E7DFDD;
    }
    .pages {
      position: absolute;
      right: 20px;
      bottom: 1%;

      .el-pagination {
        color: #94618e !important;
      }
    }
  }
  .el-form-item {
    .el-input {
      width: 160px;
    }
    .el-select {
      width: 160px;
    }
  }
}

::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: #49274a;

  color: #fff;
  font-size: 10px;
}

/deep/ .el-table tbody tr:hover > td {
  background-color: #94618e !important;
  // 可以选择隐藏
  //background-color: transparent !important;
}

// 设置分页器颜色
/deep/ .el-pager li {
  //中部li
  background: rgba(0, 0, 0, 0) !important;
}
/deep/ .el-pager li.active {
  //中部li
  color: #49274a !important;
}
/deep/ .el-pager li:hover {
  //中部li
  color: #49274a;
  background: rgba(0, 0, 0, 0) !important;
}

/deep/ .el-pagination button:disabled {
  //两边箭头的禁用和可用
  background-color: rgba(0, 0, 0, 0);
}
/deep/ .el-pagination .btn-next {
  background-color: rgba(0, 0, 0, 0);
}
/deep/ .el-pagination .btn-prev {
  background-color: rgba(0, 0, 0, 0);
}

/deep/ .el-pagination .btn-next:hover {
  color: #49274a;
  background-color: rgba(0, 0, 0, 0);
}
/deep/ .el-pagination .btn-prev :hover {
  color: #49274a;
  background-color: rgba(0, 0, 0, 0);
}

// /deep/ .el-input .el-input__inner:focus {
//         border-color: #94618e !important;
//     }

</style>

<style lang="less">
.el-message-box__btns {
  button {
    background-color: #94618e !important;
    border: none;
    color: #fff;
  }
  button:hover {
    background-color: #49274a !important;
    color: #fff !important;
  }
}
.el-icon-close:hover {
  color: #94618e !important;
}

.el-card__body .el-main {
  padding-bottom: 0 !important;
}
</style>
