<template>
  <router-link :to="url" class="module-card">
    <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header">{{ header }}</div>
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ text }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'ModuleCard',
  props: {
    header: String,
    title: String,
    text: String,
    url: String
  }
}
</script>

<style scoped>
.module-card {
  transition: transform 0.3s, background-color 0.3s;
}

.module-card:hover {
  transform: scale(1.05);
  background-color: rgba(238, 236, 232, 0.22);
}
</style>