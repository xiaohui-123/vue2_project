<template>
  <div class="dashboard-container">
    <card></card>
    <sale></sale>
    <observe></observe>
    <div>
      {{`
      <p>哈哈</p>
      `}}
    </div>
  </div>
</template>

<script>
import card from "./card";
import sale from "./sale";
import observe from "./observe";
export default {
  name: "Dashboard",
  components: {
    card,
    sale,
    observe,
  },
};
</script>

<style>
</style>
