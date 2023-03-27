<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="showDialog"
      >添加</el-button
    >
    <!-- 表格组件 -->
    <el-table :data="list" style="width: 80%; margin-top: 20px" border>
      <el-table-column type="index" label="序号" width="80px" align="center" />
      <el-table-column prop="tmName" label="品牌名称" width="width" />
      <el-table-column prop="prop" label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--  pager-count  可以设置连续按钮数-->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="pageNum"
      :page-sizes="[3, 5, 10]"
      :page-size="pageSize"
      layout="prev, pager,next, jumper,->,total, sizes"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="getData"
    />
    <!-- 弹窗 -->
    <el-dialog
      :title="form.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item
          label="品牌名称"
          :label-width="formLabelWidth"
          prop="tmName"
        >
          <el-input v-model="form.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          :label-width="formLabelWidth"
          prop="logoUrl"
        >
          <!-- action:设置图片上传的地址  -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateBaseTrademarkBtn"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      data: [],
      pageNum: 1,
      pageSize: 3,
      totalCount: 0,
      list: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      //收集品牌信息
      form: {
        tmName: "",
        logoUrl: "",
      },
      //表单验证规则   trigger：用户行为
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在2到10个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true, message: "请上传LOGO" }],
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    async getData(val = 1) {
     handleSizeChange
      let { pageNum, pageSize } = this;
      let result = await this.$API.trademark.tradeMarkList(pageNum, pageSize);
      if (result.code == 200) {
        this.totalCount = result.data.total;
        this.list = result.data.records;
      }
    },
    //添加按钮 显示弹窗
    showDialog() {
      this.dialogFormVisible = true;
      this.form = {};
    },
    updateTradeMark(row) {
      this.form = { ...row };
      console.log(this.form, "打开");
      this.dialogFormVisible = true;
    },
    //图片上传成功
    handleAvatarSuccess(res, file) {
      this.form.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 确定按钮
    addOrUpdateBaseTrademarkBtn() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          console.log(this.form, "queinf");
          let result = await this.$API.trademark.addOrUpdateBaseTrademark(
            this.form
          );
          if (result.code == 200) {
            this.$message({
              message: this.form.id ? "修改品牌成功" : "添加品牌成功",
              type: "success",
            });
            this.getData(this.form.id ? this.pageNum : 1);
          }
        } else {
          return false;
        }
      });
    },
    cancelBtn() {
      this.dialogFormVisible = false;
    },
    //删除品牌
    deleteTradeMark(row) {
      console.log(row);
      this.$confirm(`确定删除${row.tmName}吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.trademark.deleteTradeMark(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //删除操作有个坑：如果当前页只有一个 删完记得回上一页 不要停留在当前页
            this.getData(
              this.list.length > 1 ? this.pageNum : this.pageNum - 1
            );
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
