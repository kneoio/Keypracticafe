<template>
  <div>
    <div class="action-bar d-flex justify-content-between">
      <div class="action-buttons">
        <button class="btn btn-outline-secondary me-2">Create</button>
        <button class="btn btn-outline-secondary">Bookmark</button>
      </div>

      <button class="btn btn-outline-secondary">Close</button>
    </div>
    <div v-if="projectData" class="project-details">
      {{ projectData.name }}
    </div>
    <div v-else class="loading">Loading...</div>

    <div class="table-responsive">

    </div>

    <AppFooter :languages="languages" :selectedLanguage="selectedLanguage"/>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import AppFooter from "@/components/AppFooter.vue";
import apiClient from "@/apiClient";
import {handleError} from "@/utils/api";

export default {
  name: 'ProjectForm',
  components: {AppFooter},
  props: {
    projectId: String
  },
  setup(props) {
    const projectData = ref(null);
    const errorMessage = ref('');

    const fetchProjectData = async () => {
      try {
        const response = await apiClient.get(`/projects/${props.projectId}`);
        projectData.value = response.data.payload.form_data;
        console.log(projectData.value)
      } catch (error) {
        handleError(error);
      }
    };

    watch(() => props.projectId, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        fetchProjectData();
      }
    });

    onMounted(() => {
      if (props.projectId) {
        fetchProjectData();
      }
    });

    return {
      projectData,
      errorMessage,
      fetchProjectData
    };
  }
}
</script>


<style>

</style>
