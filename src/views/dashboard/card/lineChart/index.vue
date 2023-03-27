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
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          name: "销量",
          type: "line",
          data: [15, 13, 36, 10, 40, 20],
          //拐点处样式
          itemStyle: {
            opacity: 0,
          },
          //线条的样式
          lineStyle: {
            color: "pink",
          },
          //填充颜色设置
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "pink", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#ffffff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          //平滑度
          smooth: true,
        },
      ],
      //布局调试
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
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