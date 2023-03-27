<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥ 14132">
            <template slot="charts">
              <div>
                <span
                  >周同比 56.67%
                  <svg
                    t="1677649710235"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4157"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                      fill="#d81e06"
                      p-id="4158"
                    ></path>
                  </svg>
                  <span
                    >日同比 19.66%<svg
                      t="1677649769344"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="5310"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
                        fill="#1afa29"
                        p-id="5311"
                      ></path></svg
                  ></span>
                </span>
              </div>
            </template>
            <template slot="footer">
              <span>日销售额:￥1231</span>
            </template>
          </Detail>
        </el-card></el-col
      >
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88450">
            <template slot="charts">
                <lineChart></lineChart>
            </template>
            <template slot="footer">
              <span>日访问量:1231</span>
            </template>
          </Detail>
        </el-card></el-col
      >
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88435">
            <template slot="charts">
                <barChart></barChart>
            </template>
            <template slot="footer">
              <span>转化率:31%</span>
            </template>
          </Detail>
        </el-card></el-col
      >
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
                <progressChart></progressChart>
            </template>
            <template slot="footer">
              <div>
                <span
                  >周同比 56.67%
                  <svg
                    t="1677649710235"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4157"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                      fill="#d81e06"
                      p-id="4158"
                    ></path>
                  </svg>
                  <span
                    >日同比 19.66%<svg
                      t="1677649769344"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="5310"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
                        fill="#1afa29"
                        p-id="5311"
                      ></path></svg
                  ></span>
                </span>
              </div>
            </template>
          </Detail> </el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./detail";
import lineChart from './lineChart'
import barChart from './barChart'
import progressChart from './progressChart'

export default {
  name: "card",
  components: {
    Detail,lineChart,barChart,progressChart
  },
};
</script>

<style>
</style>