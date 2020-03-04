<template>
  <div id="app">
    <TopMenu />
    <CsvUpload />
  </div>
</template>

<script>
import CsvUpload from './components/CsvUpload.vue'
import TopMenu from './components/TopMenu.vue'

export default {
  name: 'App',
  components: {
    CsvUpload,
    TopMenu
  }
}
</script>

<style>
body {
    background-color: #5c87b3;
}
</style>
