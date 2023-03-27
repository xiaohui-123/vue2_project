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
        //设置最小值 最大值
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
          color: "yellowGreen",
          //设置bar宽度
          barWidth: 10,
          //设置背景颜色
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        //文本标签
          label: {
            show: true,
            //改变文本标签内容
            formatter: "|",
            //文本标签位置调试
            position: "right",
          },
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