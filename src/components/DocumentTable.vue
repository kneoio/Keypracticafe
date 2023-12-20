<template>
  <div>
    <div class="table-responsive">
      <table class="table">
        <thead>
        <tr>
          <th>
            <input type="checkbox" @change="toggleAll" v-model="allSelected" />
          </th>
          <th>Title</th>
          <th>Manager</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="doc in paginatedDocuments" :key="doc.id">
          <td>
            <input type="checkbox" v-model="selectedDocuments" :value="doc.id" />
          </td>
          <td>{{ doc.name }}</td>
          <td>{{ doc.manager }}</td>
          <td>{{ doc.status }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click="changePage(currentPage - 1)">Previous</a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
          <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click="changePage(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>

    <AppFooter :languages="languages" :selectedLanguage="selectedLanguage" />
  </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import { useLanguageStore } from '@/stores/languageStore';
import { computed, ref } from 'vue';

export default {
  name: 'DocumentTable',
  components: {
    AppFooter
  },
  props: {
    documents: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const selectedDocuments = ref([]);
    const allSelected = computed({
      get: () => selectedDocuments.value.length === props.documents.length,
      set: (value) => {
        selectedDocuments.value = value ? props.documents.map(doc => doc.id) : [];
      }
    });

    const toggleAll = () => {
      allSelected.value = !allSelected.value;
    };

    const languageStore = useLanguageStore();
    const languages = languageStore.languages;
    const selectedLanguage = languageStore.selectedLanguage;

    const itemsPerPage = 10;
    const currentPage = ref(1);
    const totalPages = computed(() => Math.ceil(props.documents.length / itemsPerPage));

    const paginatedDocuments = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return props.documents.slice(start, end);
    });

    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    return { languages, selectedLanguage, paginatedDocuments, currentPage, totalPages, selectedDocuments, toggleAll, allSelected, changePage };
  }
}
</script>


<style>

</style>
