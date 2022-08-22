<template>
  <el-upload
    accept="image/jpeg,image/gif,image/png"
    class="upload"
    style="width: 220px"
    ref="upload"
    drag
    action=""
    :http-request="uploadRequest"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="true"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
import uuid from "../utils/uuid";

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
        this.$message.error("上传文件格式错误！");
        return false;
      }
      if (!isLimit1M) {
        this.$message.error("上传文件大小不能超过1MB");
        return false;
      }

      let formData = new FormData();
      formData.append("id", uuid()); // 生成唯一id作为图片名
      formData.append("goodsId", this.getGoodsId); // 商品id
      formData.append("file", file);

      this.$api
        .uploadPics(formData)
        .then((result) => {
          if (result.data.res_code === "1") {
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
      console.log(file);
      this.$api
        .removeGoodsPics({ name: file.picname })
        .then((res) => {
          // console.log(res);
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
/deep/ .el-upload {
  width: 100%;
}
/deep/ .el-upload-dragger {
  width: 100%;
  height: 160px;
}
</style>
