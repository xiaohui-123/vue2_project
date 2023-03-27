<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getAttrInfoId="getAttrInfoId" :isShow="!isShowTable" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          style="margin-bottom: 20px"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                style="margin: 0 20px"
                type="success"
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updataAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性、修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          :disabled="!attrInfo.attrName"
          icon="el-icon-plus"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>

        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="row.flag = false"
                :ref="$index"
              ></el-input>
              <span
                style="display: block"
                v-else
                @click="toEdit(row, $index)"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 气泡确认框 -->
              <el-popconfirm
                :title="`确定删除${row.valueName}吗？`"
                @onConfirm="confirmDelete($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="saveBtn"
          :disabled="attrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button @click="cancelSave">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      attrList: [],
      isShowTable: true,
      category3Id: "",
      category2Id: "",
      category1Id: "",
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [],
        categoryLevel: 0, //三级ID
      },
    };
  },
  methods: {
    getAttrInfoId(data) {
      this.category1Id = data.category1Id;
      this.category2Id = data.category2Id;
      this.category3Id = data.category3Id;
      this.getAttrInfoattrList(data);
    },
    //获取属性基本信息
    async getAttrInfoattrList(data) {
      let { category1Id, category2Id, category3Id } = data;
      let result = await this.$API.attr.attrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    //添加属性值按钮
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, //相应的属性名ID
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //添加属性
    addAttr() {
      this.isShowTable = false;
      //清除数据
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [],
        categoryLevel: this.category3Id, //三级ID
      };
    },
    //取消保存
    cancelSave() {
      this.isShowTable = true;
      this.attrInfo = {};
    },
    //修改属性
    updataAttr(row) {
      this.isShowTable = false;
      //将选中的属性赋值给attr
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    //点击input 失焦触发
    toLook(row) {
      //新增属性值不能为空
      if (row.valueName.trim() == "") {
        return;
      }
      //新增属性值不能重复
      let repeat = this.attrInfo.attrValueList.some((item) => {
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });
      if (repeat) {
        this.$message("属性值不可重复 ");
        return;
      }
      row.flag = false;
    },
    toEdit(row, index) {
      row.flag = true;
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    //气泡确认框
    confirmDelete(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    //保存
    async saveBtn() {
      this.attrInfo.attrValueList.filter((item) => {
        if (item.valueName.trim() != "") {
          delete item.flag;
          return true;
        }
      });
      try {
        let result = await this.$API.attr.saveAttrInfo(this.attrInfo);
        // if (result.code == 200) {
        this.isShowTable = true;
        this.$message({
          type: "success",
          message: "保存成功！",
        });
        let data = {
          category1Id: this.category1Id,
          category2Id: this.category2Id,
          category3Id: this.category3Id,
        };
        this.getAttrInfoattrList(data);
      } catch (error) {}

      // }
    },
  },
};
</script>

<style scoped>
</style>
