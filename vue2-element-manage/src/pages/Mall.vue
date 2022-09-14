<template>
  <div class="mall-manage">
    <!-- 添加/编辑商品对话框 -->
    <el-dialog
      :title="operateType === 'add' ? '添加商品' : '更新商品'"
      :visible.sync="isShow"
      width="750px"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :cascaderOptions="cascaderOptions"
        :inline="true"
        ref="form"
      ></common-form>
      <div class="dialog-footer">
        <el-button @click="isShow = !isShow">取消</el-button>
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
      :tableType="tableType"
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
          type: "cascader",
        },
        {
          model: "descText",
          label: "商品描述",
          type: "editor",
        },
        {
          model: "photo",
          label: "商品图片",
          type: "upload",
        },
      ],
      //   级联选择器
      cascaderOptions: [
        {
          value: "居家生活",
          label: "居家生活",
          children: [
            {
              value: "个人护理",
              label: "个人护理",
            },
            {
              value: "厨房用品",
              label: "厨房用品",
            },
            {
              value: "床上用品",
              label: "床上用品",
            },
            {
              value: "宠物生活",
              label: "宠物生活",
            },
            {
              value: "居家百货",
              label: "居家百货",
            },
            {
              value: "一次性用品",
              label: "一次性用品",
            },
          ],
        },
        {
          value: "食品饮料",
          label: "食品饮料",
          children: [
            {
              value: "方便速食",
              label: "方便速食",
            },
            {
              value: "休闲食品",
              label: "休闲食品",
            },
            {
              value: "乳饮酒水",
              label: "乳饮酒水",
            },
            {
              value: "粮油调味",
              label: "粮油调味",
            },
            {
              value: "品质生鲜",
              label: "品质生鲜",
            },
          ],
        },
        {
          value: "家电数码",
          label: "家电数码",
          children: [
            {
              value: "电脑办公",
              label: "电脑办公",
            },
            {
              value: "运动穿戴",
              label: "运动穿戴",
            },
            {
              value: "居家清洁",
              label: "居家清洁",
            },
            {
              value: "手机平板",
              label: "手机平板",
            },
            {
              value: "小电器",
              label: "小电器",
            },
          ],
        },
        {
          value: "服饰",
          label: "服饰",
          children: [
            {
              value: "男装",
              label: "男装",
            },
            {
              value: "女装",
              label: "女装",
            },
            {
              value: "男鞋",
              label: "男鞋",
            },
            {
              value: "女鞋",
              label: "女鞋",
            },
            {
              value: "箱包",
              label: "箱包",
            },
          ],
        },
      ],
      //   填写内容
      operateForm: {},
      //   商品id
      goodsId: "",

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
      tableType: "mall",
      tableData: [],
      //   表头
      tableLabel: [
        {
          prop: "id",
          label: "商品ID",
          width: 270,
        },
        {
          prop: "name",
          label: "商品名称",
          width: 150,
        },
        {
          prop: "price",
          label: "商品价格",
          width: 100,
        },
        {
          prop: "amount",
          label: "商品数量",
          width: 100,
        },
        {
          prop: "type",
          label: "商品类目",
          width: 150,
        },
        {
          prop: "descText",
          label: "商品描述",
          width: "auto",
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
    addGood(row) {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        id: "",
        name: "",
        price: "",
        amount: "",
        type: "",
        descText: "",
        descHtml: "",
      };
      this.goodsId = row.id;
      this.$store.commit("changeGoodsId", this.goodsId); // 使用vuex管理当前点击的商品id
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
          // console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 点击编辑商品
    editGood(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
      // console.log("Mall.vue\n", this.operateForm.descText,'\n',this.operateForm.descHtml);
      this.goodsId = row.id;
      this.$store.commit("changeGoodsId", this.goodsId); // 使用vuex管理当前点击的商品id
      this.$store.dispatch("asyncGetGoodsPicsList"); // 异步获取图片列表
    },
    // 删除商品项
    deleteGood(row) {
      // element-ui中封装的二次确认弹窗
      this.$confirm("此操作不可撤回，确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.delGoods({ id: row.id }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.getList();
          console.log(`删除项:${row.name} ${row.id}`);
        });
      });
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

    /**
     * 预览图片
     */
    // previewPics(row) {
    //   this.$store.commit("changeGoodsId", row.id);
    //   this.$store.dispatch("asyncGetGoodsPicsList");
    //   console.log('2');
    // },
  },
  created() {
    // 页面加载时即调用
    this.getList();
  },
};
</script>
