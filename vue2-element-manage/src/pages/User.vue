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
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>
    <!-- 表格 -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @delete="deleteUser"
    >
    </common-table>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm.vue";
import CommonTable from "@/components/CommonTable.vue";
import { getUser } from "@/api/data";
export default {
  name: "User",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      // 对话框类型
      operateType: "add",
      // 对话框显示与否
      isShow: false,

      // Form的配置数据
      //   表头
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
      //   填写内容
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      // 搜索组件
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

      // Table数据
      tableData: [],
      //   表头
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      //   分页
      config: {
        page: 1,
        total: 30,
        loading: false
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
          this.getList();
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
    // 获取用户列表
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      getUser({
        page: this.config.page,
        name,
      }).then((res) => {
        // console.log(res);
        this.tableData = res.data.list.map((item) => {
          // 将性别从数字映射为汉字
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.data.count;
        this.config.loading = false;
      });
    },
    // 编辑用户项
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    // 删除用户项
    deleteUser(row) {
      console.log(row);
      // element-ui中封装的二次确认弹窗
      this.$confirm("此操作不可撤回，确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(
        () => {
          const id = row.id;
          console.log(id);
          this.$http
            .get("user/del", {
              params: { id },
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.getList();
            });
        },
        (res) => console.log(res)
      );
    },
  },
  created() {
    // 页面加载时即调用
    this.getList();
  },
};
</script>
