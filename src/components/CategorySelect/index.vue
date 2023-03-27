<template>
  <el-form :inline="true" :model="cForm" class="demo-form-inline">
    <el-form-item label="一级分类">
      <el-select
        placeholder="请选择"
        v-model="cForm.category1Id"
        @change="handler1"
        :disabled="isShow"
      >
        <!-- value 收集选中的一级分类的id -->
        <el-option
          :label="c1.name"
          :value="c1.id"
          v-for="(c1, index) in list1"
          :key="c1.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        placeholder="请选择"
        v-model="cForm.category2Id"
        @change="handler2"
        :disabled="isShow"
      >
        <el-option
          :label="c2.name"
          :value="c2.id"
          v-for="(c2, index) in list2"
          :key="c2.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select
        placeholder="请选择"
        v-model="cForm.category3Id"
        @change="handler3"
        :disabled="isShow"
      >
        <el-option
          :label="c3.name"
          :value="c3.id"
          v-for="(c3, index) in list3"
          :key="c3.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CategorySelect",
  props: ["isShow"],
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  mounted() {
    this.getCategory1List();
  },
  methods: {
    async getCategory1List() {
      let result = await this.$API.attr.getCategory1List();
      if (result.code == 200) {
        this.list1 = result.data;
      }
    },
    // 一级分类的select事件回调（一级分类框发生变化时获取二级分类的数据）
    async handler1() {
      this.cForm.category2Id = "";
      this.list2 = [];
      this.cForm.category3Id = "";
      this.list3 = [];
      let { category1Id } = this.cForm;
      let result = await this.$API.attr.getCategory2List(category1Id);
      if (result.code == 200) {
        this.list2 = result.data;
      }
    },
    //获取三级分类数据
    async handler2() {
      this.cForm.category3Id = "";
      this.list3 = [];
      let { category2Id } = this.cForm;
      let result = await this.$API.attr.getCategory3List(category2Id);
      if (result.code == 200) {
        this.list3 = result.data;
      }
    },
    // 获取下面详情数据
    handler3() {
      let data = {
        category1Id: this.cForm.category1Id,
        category2Id: this.cForm.category2Id,
        category3Id: this.cForm.category3Id,
      };
      this.$emit("getAttrInfoId", data);
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style>
</style>