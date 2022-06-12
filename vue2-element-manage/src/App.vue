<template>
  <div id="app">
    <!-- <ElementUITest></ElementUITest> -->
    <router-view></router-view>
  </div>
</template>

<script>
import ElementUITest from './components/ElementUITest.vue'

export default {
  name: 'App',
  components: {
    ElementUITest
  }
}
</script>

<style>
#app {
  height: 100vh;
}
</style>
