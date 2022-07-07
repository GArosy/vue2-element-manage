<template>
  <div class="common-table">
    <el-table :data="tableData" height="90%" stripe>
      <!-- 表头 -->
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
        show-overflow-tooltip
      >
        <!-- 作用域插槽 -->
        <template v-slot:default="slotProps">
          <span style="margin-left: 10px">{{ slotProps.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" min-width="180">
        <el-button size="mini" @click="handleEdit">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete"
          >删除</el-button
        >
      </el-table-column>
      <!-- 分页组件 -->
      <!-- 
        通过 layout attribute 配置组件内容 
        通过 @current-change 事件和 :current-page.sync 属性来处理当前页变动
        :page-size 每页显示条目个数
      -->
      <el-pagination
        class="pager"
        layout="prev,pager,next"
        :total="config.total"
        :page-size="20"
        :current-page.sync="config.page"
        @current-change="changePage"
      ></el-pagination>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CommonTable",
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  data() {
    return {};
  },
  methods: {
    handleEdit(row) {
        this.$emit('edit', row)
    },
    handleDelete(row) {
      console.log(row);
        this.$emit('delete', row)
    },
    changePage(page) {
        this.$emit('changePage', page)
    },
  },
};
</script>
