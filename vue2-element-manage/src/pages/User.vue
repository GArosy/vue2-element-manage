<template>
  <div class="manage">
    <!-- 对话框组件 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div class="dialog-footer">
        <el-button @click="isShow">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <!-- 搜索表单组件 -->
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="searchForm"
      >
        <el-button type="primary" @click="getList">搜索</el-button>
      </common-form>
    </div>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm.vue";
export default {
  name: "User",
  components: {
    CommonForm,
  },
  data() {
    return {
      // 对话框类型
      operateType: "add",
      // 对话框显示与否
      isShow: false,
      // Form的配置数据
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
    };
  },
  methods: {
    // 提交用户表单
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
        });
      } else {
        this.$http.post("/user/add", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
        });
      }
    },
    // 点击新增用户表单
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    getList() {},
  },
};
</script>
