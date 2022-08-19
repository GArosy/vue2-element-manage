<template>
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
    >
      <el-input
        v-if="item.type === 'input'"
        :placeholder="`请输入${item.label}`"
        v-model="form[item.model]"
        clearable
      >
      </el-input>
      <el-switch v-if="item.type === 'switch'" v-model="form[item.model]">
      </el-switch>
      <!-- 级联选择器 -->
      <el-cascader
        v-if="item.type === 'cascader'"
        v-model="form[item.model]"
        :options="cascaderOptions"
        :show-all-levels="false"
      >
      </el-cascader>
      <!-- 日期 -->
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="form[item.model]"
      ></el-date-picker>
      <!-- 选择器 -->
      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="form[item.model]"
      >
        <el-option
          v-for="optItem in item.opts"
          :key="optItem.value"
          :label="optItem.label"
          :value="optItem.value"
        ></el-option>
      </el-select>
      <common-upload v-if="item.type === 'upload'"></common-upload>
    </el-form-item>
    <!-- 如果以上组件都不满足，使用自定义插槽 -->
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
import CommonUpload from "./CommonUpload.vue";

export default {
  name: "CommonForm",
  components: {
    CommonUpload,
  },
  props: {
    formLabel: Array,
    form: Object,
    cascaderOptions: Array,
    inline: Boolean,
  },
  data() {
    return {};
  },
};
</script>
