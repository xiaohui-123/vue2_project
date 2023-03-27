<template>
  <div class="charts" ref="lineChart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  data() {
    return {};
  },
  mounted() {
    var lineChart = echarts.init(this.$refs.lineChart);
    lineChart.setOption({
      xAxis: {
        //隐藏
        show: false,
        //均分
        type: "category",
      },
      yAxis: { show: false },
      series: [
        {
          type: "bar",
          data: [15, 13, 36, 10, 40, 20],
        },
      ],
      //布局调试
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      tooltip: {},
    });
  },
  methods: {},
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>