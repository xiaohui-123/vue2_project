<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌 ">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- on-preview  预览 -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectAttr.length}类属性未选择`"
          v-model="attrIdAndAttrName"
        >
          <el-option
            :label="item.name"
            :value="`${item.id}:${item.name}`"
            v-for="(item, index) in unSelectAttr"
            :key="item.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAAttr"
          >添加销售属性</el-button
        >
        <el-table border style="width: 100%" :data="spu.spuSaleAttrList">
          <el-table-column label="序号" type="index" width="80" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(row, index)"
              >
                >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- 以下类似当年的span与input切换    
                @keyup.enter.native=" handleInputConfirm(row)"
               -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <!--   @click="showInput" -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >+ 添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpuInfo">保存</el-button>
        <el-button @click="cancel">取消 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  computed: {
    //计算出还未选择的销售属性
    //全部销售属性 this.saleAttrList
    //已有的销售属性 spu.spuSaleAttrList[].saleAttrName
    unSelectAttr() {
      return this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item2) => {
          return item2.saleAttrName != item.name;
        });
      });
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      attrIdAndAttrName: "", //未选择的Id
      spu: {
        category3Id: 0,
        description: "",
        spuName: "",
        tmId: "", //品牌ID
        spuImageList: [
          //   {
          //     id: 0,
          //     imgName: "",
          //     imgUrl: "",
          //     spuId: 0,
          //   },
        ],
        spuSaleAttrList: [
          //   {
          //     baseSaleAttrId: 0,
          //     id: 0,
          //     saleAttrName: "string",
          //     spuId: 0,
          //     spuSaleAttrValueList: [
          //       {
          //         baseSaleAttrId: 0,
          //         id: 0,
          //         isChecked: "string",
          //         saleAttrName: "string",
          //         saleAttrValueName: "string",
          //         spuId: 0,
          //       },
          //     ],
          //   },
        ],
      },
      tradeMarkList: [],
      spuImageList: [],
      saleAttrList: [],
    };
  },
  mounted() {},
  methods: {
    //照片墙删除的时候触发
    handleRemove(file, fileList) {
      //file 删除的那张图  fileList 剩余的图列表
      this.spuImageList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 页面数据初始化
    async initSpuData(spu) {
      //1、获取spu信息
      let spuResult = await this.$API.spu.getSpuById(spu.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      //2、获取品牌信息
      let tradeMarkResult = await this.$API.spu.getTrademarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      //3、获取图片
      let spuImageResult = await this.$API.spu.getSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        //服务器返回的数据（imgUrl，imgName）需要处理 element-ui需要name，url
        let arr = spuImageResult.data;
        arr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = arr;
      }
      //4、获取平台全部销售属性
      let saleResult = await this.$API.spu.getBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    //照片墙图片上传成功的回调
    handlerSuccess(response, file, fileList) {
      //收集图片信息
      this.spuImageList = fileList;
    },
    //添加销售属性
    addSaleAAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      let newArr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] };
      this.spu.spuSaleAttrList.push(newArr);
      //清楚框里数据
      this.attrIdAndAttrName = "";
    },
    //添加销售属性值
    addSaleAttrValue(row) {
      //由button 转为 input
      console.log(row);
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus();
      });
    },
    //el-input失焦事件
    handleInputConfirm(row) {
      row.inputVisible = false;
      let { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }
      let result = row.spuSaleAttrValueList.every((item) => {
        item.saleAttrValueName != inputValue;
      });
      if (!result) {
        this.$message("属性值不能重复");
        return;
      }
      let nweAttr = { baseSaleAttrId, saleAttrValueName: inputValue };
      row.spuSaleAttrValueList.push(nweAttr);
    },
    //tag标签 删除按钮
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },
    //保存按钮
    async addOrUpdateSpuInfo() {
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: item.response ? item.response.data : item.url,
        };
      });
      let result = await this.$API.spu.addOrUpdateSpu(this.spu);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "保存成功",
        });
        this.$emit("changeScene", {
          scene: 0,
          flag: this.spu.id ? "修改" : "添加",
        });
      }
      //清除数据
      Object.assign(this._data, this.$options.data());
    },
    //父组件添加SPU按钮过来的 要调两个请求：1、获取品牌2、获取所有销售属性
    async addSpuInfo(category3Id) {
      this.spu.category3Id = category3Id;
      //1、获取品牌信息
      let tradeMarkResult = await this.$API.spu.getTrademarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      //2、获取平台全部销售属性
      let saleResult = await this.$API.spu.getBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    //取消按钮
    cancel() {
      this.$emit("changeScene", { scene: 0, flag: "" });
      //清除数据
      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>