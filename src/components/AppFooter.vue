<template>
  <footer>
    <div class="position-fixed bottom-0 start-50 translate-middle-x mb-3 ms-3">
      <select :value="selectedLanguage" @change="updateLanguage($event.target.value)" class="form-select">
        <option v-for="(language, index) in languages" :key="index" :value="language">
          {{ language }}
        </option>
      </select>
    </div>
  </footer>
</template>

<script>
import { useLanguageStore } from '@/stores/languageStore';
import {onMounted, ref} from "vue";
export default {
  name: 'AppFooter',
  setup() {
    const languageStore = useLanguageStore();
    const selectedLanguage = ref(localStorage.getItem('selectedLanguage') || languageStore.selectedLanguage);

    const updateLanguage = (newValue) => {
      selectedLanguage.value = newValue;
      localStorage.setItem('selectedLanguage', newValue);
    };

    onMounted(() => {
      const storedLanguage = localStorage.getItem('selectedLanguage');
      if(storedLanguage) {
        selectedLanguage.value = storedLanguage;
      }
    });

    return {
      languages: languageStore.languages,
      selectedLanguage,
      updateLanguage
    };

  }
}
</script>

<style>

</style>
