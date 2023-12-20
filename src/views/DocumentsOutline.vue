<template>
  <div class="d-flex flex-column vh-100">
    <div class="bg-light border-bottom px-3 py-2">
      <button class="btn btn-primary me-2">Action 1</button>
      <button class="btn btn-secondary">Action 2</button>
    </div>
    <div class="d-flex flex-grow-1 overflow-hidden">
      <div class="bg-light border-end p-3" style="width: 250px;">
        <nav>
          <ul class="nav flex-column">
            <li class="nav-item"><a href="#" class="nav-link">Menu Item 1</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Menu Item 2</a></li>
          </ul>
        </nav>
      </div>

      <div class="flex-grow-1 overflow-auto p-3">
        <document-table-component :documents="documents" />
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import DocumentTableComponent from '@/components/DocumentTable.vue';
import AppFooter from '@/components/AppFooter.vue';
import apiClient from "@/apiClient";

export default {
  components: {
    DocumentTableComponent,
    AppFooter
  }, data() {
    return {
      documents: [],
      errorMessage: '',
      user: 'anonymous'
    }
  },
  created() {
    apiClient.get('/projects')
        .then(response => {
          this.documents = response.data.payload.view_data.entries;
        })
        .catch(error => {
          console.log("API error", error);
          let errorMessage;
          if (error.response) {
            errorMessage = error.response.data.message || `Error: ${error.response.status}`;
          } else if (error.request) {
            errorMessage = "No response was received from the API server.";
          } else {
            errorMessage = error.message;
          }
          this.errorMessage = errorMessage;
          this.user = 'anonymous';
        });
  }
}
</script>


<style scoped>

</style>
