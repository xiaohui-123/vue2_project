<template>
  <div>
    <el-table :data="skuList" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="width">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="150">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="150">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-download"
            size="mini"
            v-if="row.isSale == 0"
            @click="onSale(row)"
          ></el-button>
          <el-button
            v-else
            type="success"
            icon="el-icon-upload2"
            size="mini"
            @click="cancel(row)"
          ></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="skuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager,next, jumper,->,total, sizes"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="getData"
    />
    <!-- 抽屉 -->
    <el-drawer
      :visible.sync="drawer"
      :show-close="false"
      size="50%"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuDetailInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuDetailInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuDetailInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16"
          ><template>
            <el-tag
              type="success"
              v-for="(attr, index) in skuDetailInfo.skuAttrValueList"
              :key="attr.id"
              style="margin-right: 10px"
              >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
            >
          </template></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel>
            <el-carousel-item
              v-for="(item, index) in skuDetailInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" alt="" style="width:100%;height:100%" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      drawer: false,
      skuList: [],
      skuDetailInfo: {},
      page: 1,
      limit: 3,
      totalCount: 0,
      list: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData(val = 1) {
      this.page = val;
      let { page, limit } = this;
      let result = await this.$API.sku.getSkuProductList(page, limit);
      if (result.code == 200) {
        this.skuList = result.data.records;
        this.totalCount = result.data.total;
      }
    },
    //分页器
    handleSizeChange(val) {
      this.page = val;
      this.getData();
    },
    //下架
    async cancel(row) {
      let result = await this.$API.sku.cancelSale(row.id);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message({
          type: "success",
          message: "下架成功",
        });
      }
    },
    //上架
    async onSale(row) {
      let result = await this.$API.sku.onSale(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message({
          type: "success",
          message: "上架成功",
        });
      }
    },
    async skuInfo(sku) {
      this.drawer = true;
      let result = await this.$API.sku.getSkuById(sku.id);
      if (result.code == 200) {
        this.skuDetailInfo = result.data;
      }
    },
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-row {
  margin: 20px 0;
}
.el-row .el-col-5 {
  font-size: 18px;
  font-weight: bold;
  text-align: right;
}
.el-col {
  margin: 0 10px;
}
</style>
