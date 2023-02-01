<template>
<div class="home" >
  <el-row >
    <el-col :span="10" style="padding-right: 10px; ">
      <el-card class="box-card" shadow="hover">
        <div class="user">
          <img src="../assets/images/user.jpg" />
          <div class="userinfo">
            <p class="name">李小小</p>
            <p class="access">管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-01-01</span></p>
          <p>上次登录地点：<span>广州</span></p>
        </div>
      </el-card>
      <el-card
        class="box-card"
        style="margin-top: 20px; font-size: 18px; "
        shadow="hover"
      >
        <el-table
          :data="tableData"
          style="width: 100%; background-color: #49274a"
        >
          <el-table-column
            v-for="(val, key) in tableLabel"
            :prop="key"
            :label="val"
            :key="key"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="14">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          class="box-card"
          shadow="hover"
          :body-style="{ padding: 0 }"
        >
          <div class="price-info">
            <i class="icon" :class="`el-icon-${item.icon}`"></i>
            <div class="detail">
              <p class="value">$ {{ item.value }}</p>
              <p class="name">{{ item.name }}</p>
            </div>
          </div>
        </el-card>
      </div>
      <div class="linechart" style="margin-top: 10px">
        <el-card class="box-card" style="height: 240px">
          <div ref="echarts1" style="height: 240px; "></div>
        </el-card>
      </div>
      <div class="graph" >
        <el-card class="box-card">
          <div ref="echarts2" style="height: 230px;width: 100%"></div>
        </el-card>
        <el-card class="box-card" >
          <div ref="echarts3" style="height: 190px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "产品",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买量",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;

      //基于准备好的dom初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1);
      var echarts1Option = {
        color: [
          "#AB545A",
          "#B0B1B6",
          "#E5E2B9",
          "#9A7549",
          "#99857E",
          "#849B91",
          "#B57C82",
          "#E6D6D9",
        ],
      };

      const { orderData ,userData, videoData} = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
        axisLabel: {
          //y轴文字的配置
          textStyle: {
            color: "#fff",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
      };
      echarts1Option.xAxis = xAxisData;

      echarts1Option.yAxis = {
        axisLabel: {
          //y轴文字的配置
          textStyle: {
            color: "#fff",
          },
        },
      };

      echarts1Option.legend = {
        data: xAxis,
        textStyle: {
          color: "#fff",
        },
      };
      echarts1Option.series = [];
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      echarts1.setOption(echarts1Option);

      const echarts2 = echarts.init(this.$refs.echarts2);
      const echarts2Option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#fff",
            fontSize: 9
            
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#fff",
              },
            },
          },
        ],
        color: [
          "#9A7549",
          "#AB545A"

        ],
        series: [
          {
            name:'新增用户',
            data: userData.map(item => item.new),
            type: 'bar'
          },
          {
            name:'活跃用户',
            data: userData.map(item => item.active),
              type: 'bar'
          }
        ],
      };
      echarts2.setOption(echarts2Option);

      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Option = {
        tooltip: {
            trigger: "item",
          },
          color: [
          "#AB545A",
          "#B0B1B6",
          "#E5E2B9",
          "#9A7549",
          "#99857E",
          "#849B91",
          "#B57C82",
          "#E6D6D9",
          ],
          series: [
            {
              data: videoData,
              type:'pie',
              radius:'70%',
              label:{
                normal:{
                  textStyle:{
                    color:'#fff',
                    fontSize:10

                  }
                }
              }
            }

          ],
      }
      echarts3.setOption(echarts3Option);


      


    });
  },
};
</script>

<style lang="less" scoped>
.box-card {
  background-color: #49274a;
  color: #fff;
}
.user {
  display: flex;
  align-items: center;
  padding-bottom: 18px;
  margin-bottom: 15px;
  border-bottom: 1px solid #f8eee7;

  img {
    margin-right: 30px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .userinfo {
    margin-left: 30px;
    .name {
      font-size: 18px;
      margin-bottom: 15px;
      font-weight: 500;
    }
    .access {
      font-size: 15px;
    }
  }
}

.login-info {
  font-size: 10px;
  line-height: 16px;
  span {
    margin-left: 40px;
  }
}

::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: #49274a;
  border: none;
  color: #fff;
  font-size: 10px;
}

/deep/ .el-table tbody tr:hover > td {
  background-color: #94618e !important;
  // 可以选择隐藏
  //background-color: transparent !important;
}

.el-table--border::after,
.el-table--group::after,
.el-table::before {
  content: none;
}

[class*="icon"] {
  color: #fff;
  text-align: center;
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32.5%;
    height: 55px;
    margin-bottom: 10px;
    .price-info {
      display: flex;
      .icon {
        font-size: 20px;
        width: 55px;
        align-content: center;
        line-height: 55px;
        background-color: #94618e;
      }
      .detail {
        display: flex;
        flex-direction: column;
        align-content: center;
        margin-left: 15px;
        .value {
          font-size: 16px;
          margin-top: 5px;
        }
        .name {
          font-size: 10px;
          margin-top: 2px;
        }
      }
    }
  }
}

.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  /deep/.el-card__body{
    padding: 10px 0 0 0;
  }
  .box-card {
    height: 211.8px;
    width: 48.7%;
  }
}
.linechart{
  .el-card__body{
    width: 100%;
      div {
    width: 100%;
  }

  }


}


</style>


