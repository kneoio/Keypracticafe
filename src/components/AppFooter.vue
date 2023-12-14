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
export default {
  name: 'AppFooter',
  setup() {
    const languageStore = useLanguageStore(); // Use the store
    return {
      languages: languageStore.languages,
      selectedLanguage: languageStore.selectedLanguage
    }
  },
  methods: {
    updateLanguage(newValue) {
      this.$emit('update:selectedLanguage', newValue);
    }
  }
}
</script>

<style>

</style>
