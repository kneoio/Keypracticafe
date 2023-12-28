<template>
  <div class="d-flex flex-column vh-100">
    <div class="bg-light border-bottom px-3 py-2">
      <div class="row">
        <div class="col-4 d-flex align-items-center">
          <h2 class="text-start">Semantyca</h2>
        </div>
        <div class="col-3"></div>
        <div class="col-5">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search...">
            <button class="btn btn-outline-secondary me-2" type="button">Search</button>
            <button class="btn btn-outline-secondary me-2" type="button">
              <font-awesome-icon icon="user"/>
              Profile
            </button>
            <button class="btn btn-outline-secondary" type="button"
                    @click.prevent="logout">
              <font-awesome-icon icon="sign-out-alt"/>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-grow-1 overflow-hidden">


      <div class="flex-grow-1 overflow-auto p-3">
        <component :is="currentFormComponent" :project-id="projectId" />
      </div>
    </div>
    <app-footer/>
  </div>
</template>


<script>
import AppFooter from '@/components/AppFooter.vue';
import ProjectForm from "@/components/ProjectForm.vue";
import TaskForm from "@/components/TaskForm.vue";

export default {
  components: {
    ProjectForm,
    AppFooter
  }, data() {
    return {
      errorMessage: '',
      user: 'anonymous'
    }
  },
  computed: {
    projectId() {
      return this.$route.params.id;
    },
    currentFormComponent() {
      const routeType = this.$route.meta.type;
      if (routeType === 'project') {
        return ProjectForm;
      } else {
        return TaskForm;
      }

    }
  }
}
</script>


<style scoped>

</style>
