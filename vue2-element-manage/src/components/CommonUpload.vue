<template>
  <el-upload
    accept="image/jpeg,image/gif,image/png"
    class="upload"
    ref="upload"
    action=""
    :http-request="uploadRequest"
    :on-remove="handleRemove"
    :file-list="fileList"
    list-type="picture"
    :auto-upload="true"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png/gif文件，且不超过1MB
    </div>
  </el-upload>
</template>

<script>
export default {
  name: "CommonUpload",
  data() {
    return {
      // 原数据交由vuex维护
      // fileList: this.getFileList(),
      // goodsId: ''
    };
  },
  methods: {
    // 自定义上传请求
    uploadRequest(param) {
      // 验证格式和大小
      const file = param.file;
      const isImage =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLimit1M = file.size / 1024 / 1024 < 1;
      if (!isImage) {
        this.$store.dispatch("asyncGetGoodsPicsList");
        this.$message.error("上传文件格式错误！");
        return false;
      }
      if (!isLimit1M) {
        this.$store.dispatch("asyncGetGoodsPicsList");
        this.$message.error("上传文件大小不能超过1MB");
        return false;
      }

      let formData = new FormData();
      formData.append("goodsId", this.getGoodsId); // 商品id
      formData.append("file", file);

      this.$api
        .uploadPics(formData)
        .then((res) => {
          console.log("后台上传图片接口传回的数据", res);
          if (res.data.res_code === "1") {
            this.$message.success("上传成功！");
          } else {
            this.$message.error("上传失败！");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 移除文件列表文件时的钩子
    handleRemove(file, fileList) {
      console.log("点击列表图片发出的请求体", file);
      this.$api
        .removeGoodsPics({ name: file.name })
        .then((res) => {
          console.log("后台删除图片接口传回的query", res.data.query);
          if (res.data.code === 1) {
            this.$message.success("删除成功！");
          } else {
            this.$message.error("删除失败！");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  computed: {
    getGoodsId() {
      return this.$store.state.Mall.goodsId;
    },
    fileList() {
      return this.$store.state.Mall.fileList;
    },
  },
};
</script>

<style lang="scss" scoped>
// /deep/ .el-upload {
//   width: 100%;
// }
// /deep/ .el-upload-dragger {
//   width: 100%;
//   height: 160px;
// }
/deep/ .el-upload-list__item {
  transition: none
}
</style>
