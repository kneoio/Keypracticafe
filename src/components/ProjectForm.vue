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
      Form
    </div>

    <AppFooter :languages="languages" :selectedLanguage="selectedLanguage"/>
  </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import {useLanguageStore} from '@/stores/languageStore';
import {computed, onMounted, ref} from 'vue';
import apiClient from "@/apiClient";
import {useRouter} from "vue-router";

export default {
  name: 'DocumentTable',
  components: {
    AppFooter
  },
  setup() {
    const router = useRouter();
    const documents = ref([]);
    const errorMessage = ref('');
    const selectedDocuments = ref([]);
    const allSelected = computed({
      get: () => selectedDocuments.value.length === documents.value.length,
      set: (value) => {
        selectedDocuments.value = value ? documents.value.map(doc => doc.id) : [];
      }
    });
    const toggleAll = () => {
      allSelected.value = !allSelected.value;
    };
    const languageStore = useLanguageStore();
    const languages = languageStore.languages;
    const selectedLanguage = languageStore.selectedLanguage;
    const itemsPerPage = 20;
    const currentPage = ref(1);
    const totalPages = computed(() => Math.ceil(documents.value.length / itemsPerPage));
    const paginatedDocuments = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return documents.value.slice(start, end);
    });
    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    const navigateToDocument = (id) => {
      router.push(`/projects/${id}`);
    };
    const handleError = (error) => {
      let message;
      if (error.response) {
        message = error.response.data.message || `Error: ${error.response.status}`;
      } else if (error.request) {
        message = "No response was received from the API server.";
      } else {
        message = error.message;
      }
      errorMessage.value = message;
    };

    const fetchDocuments = () => {
      apiClient.get('/projects')
          .then(response => {
            documents.value = response.data.payload.view_data.entries;
          })
          .catch(handleError);
    };
    onMounted(() => {
      fetchDocuments();
    });
    return {
      languages,
      selectedLanguage,
      paginatedDocuments,
      currentPage,
      totalPages,
      selectedDocuments,
      toggleAll,
      allSelected,
      changePage,
      navigateToDocument
    };
  }
}
</script>


<style>
.table td {
  text-align: left;
}

.table-hover tbody tr:hover {
  cursor: pointer;
}

.action-bar {
  padding: 10px;
  background-color: #f5f5f5;
}

.action-buttons {
  display: flex;
  gap: 0px;
}

.close-btn {
  margin-left: auto;
}

.create-btn, .bookmark-btn {
  margin-right: 5px;
}
</style>
