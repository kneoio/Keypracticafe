<template>
  <div>
    <AppFooter :languages="languages" :selectedLanguage="selectedLanguage" />
  </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import { useLanguageStore } from '@/stores/languageStore';

export default {
  name: 'ModuleDetailView',
  components: {
    AppFooter
  },
  setup() {
    const languageStore = useLanguageStore();
    const languages = languageStore.languages;
    const selectedLanguage = languageStore.selectedLanguage;

    return { languages, selectedLanguage };
  }
}
</script>

<style>

</style>
