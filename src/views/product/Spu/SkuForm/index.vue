<template>
  <el-form ref="form" label-width="100px">
    <el-form-item label="SPU名称">{{ spu.spuName }} </el-form-item>
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格（元）">
      <el-input
        placeholder="价格（元）"
        v-model="skuInfo.price"
        type="number"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量（千克）">
      <el-input placeholder="重量（千克）" v-model="skuInfo.weight"></el-input>
    </el-form-item>
    <el-form-item label="规格描述">
      <el-input
        type="textarea"
        rows="4"
        placeholder="规格描述"
        v-model="skuInfo.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true" label-width="80px">
        <el-form-item
          :label="attr.attrName"
          v-for="(attr, index) in attrInfoList"
          :key="attr.id"
        >
          <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
            <el-option
              :label="attrValue.valueName"
              v-for="(attrValue, index) in attr.attrValueList"
              :key="attrValue.id"
              :value="`${attrValue.id}:${attrValue.attrId}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true" label-width="80px">
        <el-form-item
          :label="saleAttr.saleAttrName"
          v-for="(saleAttr, index) in spuSaleAttrList"
          :key="saleAttr.id"
        >
          <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
            <el-option
              :label="saleAttrValue.saleAttrValueName"
              v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :value="`${saleAttr.id}:${saleAttrValue.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片列表">
      <el-table
        border
        style="width: 100%"
        :data="spuImageList"
        @selection-change="handleSelectionChange"
        >>
        <el-table-column
          prop="prop"
          type="selection"
          label="label"
          width="width"
        >
        </el-table-column>
        <el-table-column prop="prop" label="图片" width="width">
          <template slot-scope="{ row, $index }">
            <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="imgName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="{ row, $index }">
            <el-button
              type="primary"
              v-if="row.isDefault == 0"
              @click="set(row)"
              >设置默认</el-button
            >
            <el-button v-else>默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      spuImageList: [], //存储图片的信息
      spuSaleAttrList: [], //存储销售属性数据
      attrInfoList: [], //存储商品基础信息
      skuInfo: {
        //1、父组件给的
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        id: 0,
        //2、通过数据双向绑定
        skuName: "",
        price: 0,
        weight: 0,
        skuDesc: "",

        //3、写代码自己收集
        //默认图片
        skuDefaultImg: "",
        //收集图片
        skuImageList: [
          // {
          //   imgName: "",
          //   imgUrl: "",
          //   isDefault: "",
          //   spuImgId: 0,
          // },
        ],
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   attrName: "",
          //   id: 0,
          //   skuId: 0,
          //   valueId: 0,
          //   valueName: "",
          // },
        ],
        //销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      spu: {
        spuName: "",
      },
      multipleSelection: [], //选中的图片列表
    };
  },
  methods: {
    //获取sku数据
    async addSkuInfo(category1Id, category2Id, spu) {
      let { category3Id, id, spuName, tmId } = spu;
      this.spu.spuName = spuName;
      this.skuInfo.category3Id = category3Id;
      this.skuInfo.spuId = id;
      this.skuInfo.tmId = tmId;
      //获取图片数据
      let result = await this.$API.sku.getSpuImageList(id);
      if (result.code == 200) {
        let list = result.data;
        //服务器返回的数据需要进行处理一下 添加isDefault字段
        list.forEach((item) => {
          item.isDefault = "0";
        });
        this.spuImageList = list;
      }
      //获取销售属性的数据
      let result2 = await this.$API.sku.getSpuSaleAttrList(id);
      if (result2.code == 200) {
        this.spuSaleAttrList = result2.data;
      }
      //获取商品基础
      let result3 = await this.$API.sku.getAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result3.code == 200) {
        this.attrInfoList = result3.data;
      }
    },
    //选中图片的列表
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //设置默认
    set(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      //设置服务器上言返回的默认图
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    //保存
    //attrInfoList.attrIdAndValueId =>skuInfo.skuAttrValueList
    //spuSaleAttrList.attrIdAndValueId =>skuInfo.skuSaleAttrValueList
    async save() {
      let { attrInfoList, skuInfo, spuSaleAttrList, multipleSelection } = this;
      //整理平台属性 第一种方法
      // let newArr = [];
      // attrInfoList.forEach((item) => {
      //   if (item.attrIdAndValueId) {
      //     let [attrId, valueId] = item.attrIdAndValueId.split(":");
      //     newArr.push({ valueId, attrId });
      //   }
      // });
      // skuInfo.skuAttrValueList = newArr;

      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          let [attrId, valueId] = item.attrIdAndValueId.split(":");
          prev.push({ attrId, valueId });
        }
        return prev;
      }, []);

      //整理销售属性 使用reduce方法
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          let [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);

      //整理收集图片
      skuInfo.skuImageList = multipleSelection.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });

      //发请求
      let result = await this.$API.sku.saveSkuInfo(skuInfo);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "添加SKU成功",
        });
        this.$emit("changeScenes", 0);
      }
      Object.assign(this._data, this.$options.data());
    },
    //取消按钮
    cancel() {
      this.$emit("changeScenes", 0);
      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style>
</style>