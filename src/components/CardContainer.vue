<template>
  <div class="container">
    <ModuleCard header="Absolute" title="Projects" text="Application module to manage projects and tasks." />
    <ModuleCard header="Absolute" title="Dictionaries" text="Utility module to handle all dictionaries and classifiers." />
    <ModuleCard header="Absolute" title="Administrator" text="Administrative module to manage users and parameters of teh system." />
  </div>
</template>

<script>
import ModuleCard from './ModuleCard.vue'

export default {
  name: 'CardContainer',
  components: {
    ModuleCard: ModuleCard
  }
}
</script>
