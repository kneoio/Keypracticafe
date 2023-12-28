<template>
  <div>
    <div class="action-bar d-flex justify-content-between">
      <div class="action-buttons">
        <button class="btn btn-outline-secondary me-2">Create</button>
        <button class="btn btn-outline-secondary">Bookmark</button>
      </div>

      <button class="btn btn-outline-secondary">Close</button>
    </div>
    <div class="table-responsive">
      Task Form
    </div>

    <AppFooter :languages="languages" :selectedLanguage="selectedLanguage"/>
  </div>
</template>

<script>
export default {
  props: ['projectId'],
  data() {
    return {
      projectData: null,
      // other data properties
    }
  },
  watch: {
    projectId(newVal, oldVal) {
      // React to projectId change, useful for when the same form is used for different projects
      if (newVal !== oldVal) {
        this.fetchProjectData();
      }
    }
  },
  created() {
    this.fetchProjectData();
  },
  methods: {
    fetchProjectData() {
      //const url = `your-api-endpoint/${this.projectId}`;
      // Fetch data from API using the projectId
      // Update projectData with the response
    }

  }
}
</script>


<style>

</style>
