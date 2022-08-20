<template>
  <el-upload
    accept="image/jpeg,image/gif,image/png"
    class="upload"
    style="width: 220px"
    ref="upload"
    drag
    action=""
    :http-request="uploadRequest"
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
import base from "../api/base";
import uuid from "../utils/uuid";

export default {
  name: "CommonUpload",
  props: {
    goodsId: String,
  },
  data() {
    return {
      fileList: [],
      uploadURL: base.uploadPics,
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
      formData.append("goodsId", this.goodsId); // 商品id
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

    // 回显已上传的图片列表
    getGoodsPicsList() {
      this.$api
        .showGoodsPicsList({
          goodsId: this.goodsId,
        })
        .then((res) => {
          console.log(res);
          // 从后台数据库获取已上传的图片列表
          if (res.data.code === 1) {
            res.data.list.forEach((element) => {
              this.fileList.push({ ...element, name: element.originalname });
            });
          } else {
            console.log("0");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getGoodsPicsList();
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
