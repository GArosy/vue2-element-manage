<template>
  <div class="mall-manage">
    <!-- 添加/编辑商品对话框 -->
    <el-dialog
      :title="operateType === 'add' ? '添加商品' : '更新商品'"
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
    <!-- 1. 搜索框 -->
    <div class="manage-header">
      <el-button type="primary" @click="addGood">+ 新增</el-button>
      <common-form
        :formLabel="searchFormLabel"
        :form="searchForm"
        :inline="true"
        ref="searchForm"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <!-- 2. 表格区域 -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editGood"
      @delete="deleteGood"
    >
    </common-table>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm.vue";
import CommonTable from "@/components/CommonTable.vue";
// mock数据
// import { getGoods } from "@/api/data";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Mall",
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
          label: "商品名称",
          type: "input",
        },
        {
          model: "price",
          label: "商品价格",
          type: "input",
        },
        {
          model: "amount",
          label: "商品数量",
          type: "input",
        },
        {
          model: "type",
          label: "商品类目",
          type: "input",
        },
        {
          model: "photo",
          label: "商品图片",
          type: "input",
        },
        {
          model: "description",
          label: "商品描述",
          type: "input",
        },
      ],
      //   填写内容
      operateForm: {
        name: "",
        price: "",
        amount: "",
        type: "",
        photo: "",
        description: "",
      },

      // 搜索组件
      searchFormLabel: [
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
          prop: "id",
          label: "商品ID",
          width: 200,
        },
        {
          prop: "name",
          label: "商品名称",
        },
        {
          prop: "price",
          label: "商品价格",
        },
        {
          prop: "amount",
          label: "商品数量",
        },
        {
          prop: "type",
          label: "商品类目",
        },
        {
          prop: "photo",
          label: "商品图片",
        },
        {
          prop: "description",
          label: "商品描述",
          width: 250,
        },
      ],
      //   分页
      config: {
        page: 1,
        total: 30,
        loading: false,
      },
    };
  },
  methods: {
    // 提交商品表单
    confirm() {
      if (this.operateType === "add") {
        this.$api.createGoods(this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      } else {
        this.$api.editGoods(this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      }
    },

    // confirm() {
    //   if (this.operateType === "edit") {
    //     this.$http.post("/mall/edit", this.operateForm).then((res) => {
    //       // console.log(res);
    //       this.isShow = false;
    //       this.getList();
    //     });
    //   } else {
    //     this.$http.post("/mall/add", this.operateForm).then((res) => {
    //       // console.log(res);
    //       this.isShow = false;
    //       this.getList();
    //     });
    //   }
    // },
    // 点击新增商品
    addGood() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        id: "",
        name: "",
        price: "",
        amount: "",
        type: "",
        photo: "",
        description: "",
      };
    },
    // 获取商品列表
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      // console.log(this.$api);
      // getGoods({  // mock数据
      this.$api
        .getGoods({
          page: this.config.page,
          name,
        })
        .then((res) => {
          // console.log(res);
          this.tableData = res.data.list;
          this.config.total = res.data.count;
          this.config.loading = false;
        });
    },
    // 点击编辑商品
    editGood(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
      console.log(`编辑项:${row.name} ${row.id}`);
    },
    // 删除商品项
    deleteGood(row) {
      // element-ui中封装的二次确认弹窗
      this.$confirm("此操作不可撤回，确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(
        () => {
          this.$api.delGoods({id: row.id}).then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
            console.log(`删除项:${row.name} ${row.id}`);
          });
        }
      );
    },
    // deleteGood(row) {
    //   // element-ui中封装的二次确认弹窗
    //   this.$confirm("此操作不可撤回，确定要删除吗？", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(
    //     () => {
    //       const id = row.id;
    //       this.$http
    //         .get("mall/del", {
    //           params: { id },
    //         })
    //         .then(() => {
    //           this.$message({
    //             type: "success",
    //             message: "删除成功",
    //           });
    //           this.getList();
    //           console.log(`删除项:${row.name} ${row.id}`);
    //         });
    //     },
    //     (res) => console.log(res)
    //   );
    // },
  },
  created() {
    // 页面加载时即调用
    this.getList();
  },
};
</script>
