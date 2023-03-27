<template>
  <div>
    <div class="header">
      {{ title }}
      <svg
        t="1677648985117"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2765"
        width="16"
        height="16"
      >
        <path
          d="M512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768zM42.666667 512C42.666667 252.8 252.8 42.666667 512 42.666667s469.333333 210.133333 469.333333 469.333333-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512z"
          fill="#cdcdcd"
          p-id="2766"
        ></path>
        <path
          d="M561.621333 394.752a42.666667 42.666667 0 0 1 14.08 37.205333l-34.986666 279.552 24.917333-6.229333a42.666667 42.666667 0 1 1 20.736 82.773333l-85.333333 21.333334a42.666667 42.666667 0 0 1-52.693334-46.677334l34.944-279.552-24.917333 6.229334a42.666667 42.666667 0 0 1-20.736-82.773334l85.333333-21.333333a42.666667 42.666667 0 0 1 38.656 9.472zM448 277.333333a42.666667 42.666667 0 0 1 42.666667-42.666666h42.666666a42.666667 42.666667 0 0 1 0 85.333333h-42.666666a42.666667 42.666667 0 0 1-42.666667-42.666667z"
          fill="#cdcdcd"
          p-id="2767"
        ></path>
      </svg>
    </div>
    <div class="content">{{count}}</div>
    <div class="chart">
      <slot name="charts"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  props: ["title","count"],
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  color: #d9d9d9;
}
.content {
  font-size: 30px;
  padding: 10px 0;
}
.chart {
  height: 50px;
}
.footer {
  border-top: 1px solid #f3f3f3;
  padding: 10px 0 0;
}
</style>