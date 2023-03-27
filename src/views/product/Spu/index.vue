<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getAttrInfoId="getAttrInfoId" :isShow="scene != 0" />
    </el-card>
    <el-card>
      <!-- 第一部分：SPU列表 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 20px"
          @click="addSPU"
          :disabled="!category3Id"
          >添加SPU</el-button
        >

        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <HinButton
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></HinButton>
              <HinButton
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></HinButton>
              <HinButton
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部的sku"
                @click="handler(row)"
              ></HinButton>
              <el-popconfirm
                :title="`确定删除${row.spuName}吗？`"
                @onConfirm="confirmDelete(row)"
              >
                <HinButton
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></HinButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px; text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="pageSize"
          layout="prev, pager,next, jumper,->, sizes,total"
          :total="totalCount"
          @size-change="handleSizeChange"
          @current-change="getData"
        />
      </div>
      <!-- 第二部分：添加/修改SPU -->
      <div v-show="scene == 1">
        <SpuForm @changeScene="changeScene" ref="spu" />
      </div>
      <!-- 第三部分：添加SKU-->
      <div v-show="scene == 2">
        <SkuForm ref="sku" @changeScenes="changeScenes" />
      </div>
    </el-card>
    <!-- dialog 弹出框-->
    <el-dialog
      :title="`${spu.spuName}的SKU列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <el-table :data="skuList" border style="width: 100%"   v-loading="loading">
        <el-table-column
          property="skuName"
          label="名称"
          width="width"
        ></el-table-column>
        <el-table-column
          property="price"
          label="价格"
          width="width"
        ></el-table-column>
        <el-table-column
          property="weight"
          label="重量"
          width="width"
        ></el-table-column>
        <el-table-column property="property" label="默认图片" width="width">
          <template slot-scope="{ row, $index }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  components: {
    SpuForm,
    SkuForm,
  },
  data() {
    return {
      loading:true,
      dialogTableVisible: false, //弹出层显示
      spu: {}, //弹出层spu的列表信息
      skuList: [], //弹出层sku列表
      scene: 0, //0:SPU列表 1:添加/修改SPU 2:添加SKU
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1,
      pageSize: 3,
      totalCount: 0, //总数据数
      records: [], //spu列表数据
    };
  },
  mounted() {},
  methods: {
    //三级联动的自定义事件 将3个ID传过来
    getAttrInfoId(data) {
      this.category1Id = data.category1Id;
      this.category2Id = data.category2Id;
      this.category3Id = data.category3Id;
      this.getData();
    },
    //添加SPU
    addSPU() {
      this.scene = 1;
      this.$refs.spu.addSpuInfo(this.category3Id);
    },
    //修改某一个Spu
    updateSpu(row) {
      this.scene = 1;
      //给子组件打标识  获取子组件的所有属性和方法
      this.$refs.spu.initSpuData(row);
    },
    // 改变一页显示的数据
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    //获取spu基本数据
    async getData(val = 1) {
      this.page = val;
      let { page, pageSize, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, pageSize, category3Id);
      if (result.code == 200) {
        this.records = result.data.records;
        this.totalCount = result.data.total;
      }
    },
    //切换场景(spu)
    changeScene({ scene, flag }) {
      //子组件通知父组件 不要忘记更新数据
      this.scene = scene;
      if (flag == "修改") {
        this.getData(this.page);
      } else {
        this.getData();
      }
    },
    //删除spu的回调
    async confirmDelete(row) {
      // console.log(row);
      let res = await this.$API.spu.reqDeleteSpu(row.id);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        //SPU个数大于1 删除后停留在当前页面 不然要回到上一页
        this.getData(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    //添加sku
    addSku(row) {
      console.log(row);
      this.scene = 2;
      this.$refs.sku.addSkuInfo(this.category1Id, this.category2Id, row);
    },
    //切换场景(sku)
    changeScenes(scene) {
      this.scene = scene;
    },
    //点击查看sku列表
    async handler(row) {
      this.dialogTableVisible = true;
      this.spu = row;
      let result = await this.$API.sku.getSkuList(row.id);
      if (result.code == 200) {
        this.loading = false
        this.skuList = result.data;
      }
    },
    //关闭对话框的回调
    close(done){
      this.loading = true
      //清除skuList的数据 以防止回显
      this.skuList = []
      done()
    }
  },
};
</script>

<style scoped>
</style>
