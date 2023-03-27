<template>
  <div style="margin-top: 20px">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="letfItem">
          <el-tabs v-model="activeName">
            <el-tab-pane label="销售额" name="sale"></el-tab-pane>
            <el-tab-pane label="访问量" name="visit"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="rightItem">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            v-model="date"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="width: 220px"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="20">
            <div
              class="charts"
              style="height: 300px; width: 100%"
              ref="chartss"
            ></div>
          </el-col>
          <el-col :span="4">
            <div class="">门店{{ title }}排名</div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
export default {
  name: "sale",
  data() {
    return {
      activeName: "sale",
      date: [],
      barChart: null,
    };
  },
  computed: {
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
  },
  mounted() {
    this.barChart = echarts.init(this.$refs.chartss);
    this.barChart.setOption({
      title: {
        text: "销售额趋势",
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 446, 123, 120, 509, 378],
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
    });
  },
  //监听title变化 重新设置图表option
  watch: {
    title() {
      this.barChart.setOption({
        title: {
          text: `${this.title}趋势`,
        },
      });
    },
  },
  methods: {
    setDay() {
      let date = dayjs().fmormat("YYYY-MM-DD");
      this.date = [date, date];
    },
    setWeek() {
      let start = dayjs().day(1).format("YYYY-MM-DD");
      let end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setMonth() {
      let start = dayjs().startOf("month").format("YYYY-MM-DD");
      let end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setYear() {
      let start = dayjs().startOf("year").format("YYYY-MM-DD");
      let end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style lang="scss" scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.letfItem {
  width: 100%;
}
.rightItem {
  display: flex;
  position: absolute;
  right: 0;
  align-items: center;
  span {
    margin-right: 10px;
  }
  .charts {
    width: 100%;
    height: 300px;
  }
}
</style>