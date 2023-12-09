<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <MainWorkspace/>
</template>

<script>
import MainWorkspace from "@/views/MainWorkspace.vue";

export default {
  name: 'App',
  components: {
    MainWorkspace
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
