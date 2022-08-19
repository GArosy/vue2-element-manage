<template>
  <el-upload
    accept="image/jpeg,image/gif,image/png"
    class="upload-demo"
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

export default {
  name: "CommonUpload",
  data() {
    return {
      fileList: [],
      uploadURL: base.uploadPics,
    };
  },
  methods: {
    // 点击上传按钮
    // submitUpload() {
    //   this.$refs.upload.submit();
    // },
    // 自定义上传请求
    uploadRequest(param) {
      console.log('uploadRequest', param);

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
      formData.append('file', file)

      this.$api.uploadPics(formData).then((result) => {
        console.log(result);
        if (result.data.res_code === '1') {
          this.$message.success("上传成功！");
        } else {
          this.$message.error("上传失败！");
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    // onUploadChange(file, fileList) {
    //   // console.log(fileList);
    //   const isImage =
    //     file.raw.type === "image/jpeg" ||
    //     file.raw.type === "image/png" ||
    //     file.raw.type === "image/gif";
    //   const isLimit1M = file.size / 1024 / 1024 < 1;

    //   if (!isImage) {
    //     this.$message.error("上传文件格式错误！");
    //     return false;
    //   }
    //   if (!isLimit1M) {
    //     this.$message.error("上传文件大小不能超过1MB");
    //     this.fileList = fileList.splice(-1);
    //     return false;
    //   }

    //   let reader = new FileReader();
    //   // 将图片转化为base64的URL
    //   reader.readAsDataURL(file.raw);
    //   // 处理load事件,读取操作完成时触发
    //   reader.onload = function (e) {
    //     // console.log(e);
    //   };
    // },
    // onUploadSuccess(res, file, fileList) {
    //   console.log("上传成功");
    //   console.log(res);
    // },
  },
};
</script>
