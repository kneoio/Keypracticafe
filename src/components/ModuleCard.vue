<template>
  <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
    <div class="card-header">{{ header }}</div>
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    header: String,
    title: String,
    text: String
  }
}
</script>
