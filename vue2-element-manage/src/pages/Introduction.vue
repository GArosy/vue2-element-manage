<template>
  <div>
    <el-row class="user-center" :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <h1>通用后台管理系统</h1>
          <h3>用户可以查看和添加商品信息</h3>
          <h3>管理员可以查看、添加和删除商品/用户信息</h3>
          <div class="stack">
            <p>使用技术栈</p>
            <p>
              <span>Vue2</span>
              <span>ElementUI</span>
              <span>VueX</span>
              <span>VueRouter</span>
              <span>SCSS</span>
              <span>axios</span>
              <span>Mock.js</span>
              <span>ECharts</span>
              <span>Nginx</span>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Introduction",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 1.5rem;
}


span {
  display: inline-block;
  padding: 5px;
  margin: 4px;
  border-radius: 3px;
  color: #f5f5f5;
  background-color: #41b883;
}

.user-center {
  text-align: center;
  margin-top: 20px;
}
.stack {
    margin: 50px 0 30px;
}
</style>
