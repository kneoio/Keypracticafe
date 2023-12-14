import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('languageStore', {
    state: () => ({
        languages: [], // Your languages array
        selectedLanguage: 'English', // Default selected language
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
