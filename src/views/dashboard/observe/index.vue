<template>
  <div style="margin-top: 20px">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card> <search></search> </el-card
      ></el-col>
      <el-col :span="12"
        ><el-card><category></category></el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import search from "./search";
import category from "./category";
export default {
  name: "observe",
  components: {
    search,
    category,
  },
};
</script>

<style>
</style>