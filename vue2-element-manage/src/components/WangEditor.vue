<template>
  <div id="main">
    
  </div>
</template>

<script>
import E from 'wangeditor';
  export default {
    
    mounted() {
      // 创建实例
      const editor = new E('#main');
      editor.create()
    },
  }
</script>