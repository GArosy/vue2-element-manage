<template>
  <div class="mall-manage">
    <!-- 添加商品对话框 -->
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
      <el-button type="primary" @click="addUser">+ 新增</el-button>
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
      @edit="editUser"
      @delete="deleteUser"
    >
    </common-table>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm.vue";
import CommonTable from "@/components/CommonTable.vue";
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
          label: "商品图片"
        },
        {
          prop: "description",
          label: "商品描述",
          width: 200,
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
};
</script>
