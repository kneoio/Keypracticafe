<template>
  <div class="grid-container">
    <ModuleCard class="module-card"
        v-for="(module, index) in modules"
        :key="index"
        :header="module.identifier"
        :title="module.localizedName.ENG"
        :text="module.localizedDescription.ENG"
        :url="`/module/${module.identifier}`"
    />
  </div>
</template>

<script>
import ModuleCard from './ModuleCard.vue'

export default {
  name: 'CardContainer',
  components: {
    ModuleCard: ModuleCard
  },
  props: {
    modules: Array
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
  margin: 1rem;
  align-content: start;
}

.module-card {
  cursor: pointer;
  color: black;
  text-decoration: none;
}

.module-card:hover {
  background-color: #f0f0f0;
}

@media (min-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (min-width: 900px) {
  .grid-container {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (min-width: 1200px) {
  .grid-container {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>


