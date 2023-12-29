<template>
  <div>
    <div class="action-bar d-flex justify-content-between">
      <div class="action-buttons">
        <button class="btn btn-outline-secondary me-2">Create</button>
        <button class="btn btn-outline-secondary">Bookmark</button>
      </div>
      <button class="btn btn-outline-secondary" @click="goBack">Close</button>
    </div>

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="#">Common</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Attachments</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">ACL</a>
      </li>
    </ul>

    <div v-if="projectData" class="container mt-4">
      <div class="row">
        <!-- Title on the left side -->
        <div class="col-md-6">
          <h2 class="text-start mb-0">{{ projectData.name }}</h2>
        </div>

        <!-- Status field on the right side, same line as title -->
        <div class="col-md-6 d-flex justify-content-end align-items-center">
          <div class="d-flex align-items-center">
            <label for="projectStatus" class="form-label mb-0 me-2">Status:</label>
            <input type="text" readonly class="form-control form-control-sm" id="projectStatus"
                   :value="projectData.status" style="width: auto; max-width: 180px;">
          </div>
        </div>
      </div>

      <div class="container mt-5">
        <div class="row g-3">
          <!-- Field: Finish Date -->
          <div class="col-12 d-flex align-items-center">
            <label for="finishDate" class="col-md-3 form-label mb-0 text-end pe-2">Finish Date:</label>
            <div class="col-md-9">
              <input type="text" readonly class="form-control form-control-sm" id="finishDate" :value="projectData.finishDate">
            </div>
          </div>

          <!-- Field: Manager -->
          <div class="col-12 d-flex align-items-center">
            <label for="manager" class="col-md-3 form-label mb-0 text-end pe-2">Manager:</label>
            <div class="col-md-9">
              <input type="text" readonly class="form-control form-control-sm" id="manager" :value="projectData.manager">
            </div>
          </div>

          <!-- Field: Coder -->
          <div class="col-12 d-flex align-items-center">
            <label for="coder" class="col-md-3 form-label mb-0 text-end pe-2">Coder:</label>
            <div class="col-md-9">
              <input type="text" readonly class="form-control form-control-sm" id="coder" :value="projectData.coder">
            </div>
          </div>

          <!-- Field: Tester -->
          <div class="col-12 d-flex align-items-center">
            <label for="tester" class="col-md-3 form-label mb-0 text-end pe-2">Tester:</label>
            <div class="col-md-9">
              <input type="text" readonly class="form-control form-control-sm" id="tester" :value="projectData.tester">
            </div>
          </div>
        </div>
      </div>




    </div>
    <div v-else class="loading">Loading...</div>
    <AppFooter/>
  </div>
</template>


<script>
import {ref, watch, onMounted} from 'vue';
import AppFooter from "@/components/AppFooter.vue";
import apiClient from "@/apiClient";
import {handleError} from "@/utils/api";
import {useRouter} from "vue-router";

export default {
  name: 'ProjectForm',
  components: {AppFooter},
  props: {
    projectId: String
  },
  setup(props) {
    const projectData = ref(null);
    const errorMessage = ref('');
    const router = useRouter();

    const goBack = () => {
      router.back();  // Go back to previous route
    };

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
      fetchProjectData,
      goBack
    };
  }
}
</script>


<style>

</style>
