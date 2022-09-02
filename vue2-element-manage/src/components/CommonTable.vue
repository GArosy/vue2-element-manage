<template>
  <div class="common-table">
    <el-table :data="tableData" height="75vh" fit>
      <!-- 数据列 -->
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
        show-overflow-tooltip
        style="margin-left: 10px"
      >
        <!-- 作用域插槽 -->
        <template v-slot:default="slotProps">
          <span>{{ slotProps.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <slot ></slot>

      <!-- 图片预览 -->
      <el-table-column label="商品图片" width="80" v-if="tableType === 'mall'">
        <template v-slot:default="operate">
          <el-popover placement="bottom" width="200" trigger="click">
            <!-- 轮播图 -->
            <el-carousel
              trigger="click"
              height="180px"
              :autoplay="false"
              :loop="false"
              indicator-position="outside"
              v-if="isShow"
            >
              <el-carousel-item v-for="(item, index) in urls" :key="index">
                <el-image :src="item" fit="contain"> </el-image>
              </el-carousel-item>
            </el-carousel>
            <!-- 占位 -->
            <div v-else class="popover-placeholder">
              <p>暂无图片</p>
            </div>
            <el-button
              size="mini"
              slot="reference"
              @click="handlePreview(operate.row)"
              >预览</el-button
            >
          </el-popover>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" min-width="180">
        <template v-slot:default="operate">
          <el-button size="mini" @click="handleEdit(operate.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(operate.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!-- 
      通过 layout attribute 配置组件内容 
      通过 @current-change 事件和 :current-page.sync 属性来处理当前页变动
      :page-size 每页显示条目个数
    -->
    <el-pagination
      class="pager"
      layout="total,prev,pager,next"
      :total="config.total"
      :page-size="20"
      :current-page.sync="config.page"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "CommonTable",
  props: {
    tableType: String,
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  data() {
    return {
      urls: [],
      isShow: true,
    };
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("delete", row);
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
    handlePreview(row) {
      // 清空urls
      this.urls = [];
      this.$store.commit("changeGoodsId", row.id);
      this.$store.dispatch("asyncGetGoodsPicsList");
    },
  },
  computed: {
    getfileList() {
      return this.$store.state.Mall.fileList;
    },
  },
  // fileList是由vuex异步加载的，组件渲染时state为空，需要额外监听vuex中的state
  watch: {
    getfileList(val) {
      val.forEach((element) => {
        this.urls.push(element.url);
      });
      this.isShow = !(this.urls.length == 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.popover-placeholder {
  color: #aaa;
  text-align: center;
}
</style>
