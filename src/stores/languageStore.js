import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('languageStore', {
    state: () => ({
        languages: [],
        selectedLanguage: 'English',
    }),
    actions: {
        setLanguages(languages) {
            this.languages = languages;
        },
        setSelectedLanguage(language) {
            this.selectedLanguage = language;
        },
    },
});
