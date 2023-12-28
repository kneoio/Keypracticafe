<template>
  <div v-if="errorMessage" class="alert alert-danger" role="alert">
    {{ errorMessage }}
  </div>
  <div v-if="workspaceData">
    <div class="hello">
      <nav class="py-2 bg-light border-bottom">
        <div class="container d-flex flex-wrap">
          <ul class="nav me-auto">
            <li class="nav-item"><a href="#" class="nav-link link-dark px-2 active" aria-current="page">Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link link-dark px-2">FAQs</a></li>
            <li class="nav-item"><a href="#" class="nav-link link-dark px-2">About</a></li>
          </ul>
          <ul class="nav">
            <li class="nav-item">
              <a href="#" class="nav-link link-dark px-2" v-if="user && user !== 'anonymous'"
                 @click.prevent="userProfile">{{ user }}</a>
              <a href="#" class="nav-link link-dark px-2" v-else @click.prevent="login">Login</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link link-dark px-2" v-if="user && user !== 'anonymous'" @click.prevent="logout">Logout</a>
              <a href="#" class="nav-link link-dark px-2" v-else @click.prevent="signUp">Sign up</a>
            </li>
          </ul>

        </div>
      </nav>
      <header class="py-3 mb-4 border-bottom">
        <div class="container d-flex flex-wrap justify-content-center">
          <a href="/public" class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
            <svg class="bi me-2" width="40" height="32">
              <use xlink:href="#bootstrap"/>
            </svg>
            <span class="fs-4">... to dare code effective</span>
          </a>
          <form class="col-12 col-lg-auto mb-3 mb-lg-0">
            <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
          </form>
        </div>
      </header>
      <CardContainer :modules="modules"/>
      <AppFooter :languages="languages" :selectedLanguage="selectedLanguage" />
    </div>
  </div>
</template>

<script>
import apiClient from "@/apiClient";
import CardContainer from "@/components/CardContainer.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useLanguageStore } from '@/stores/languageStore';

export default {
  components: {
    CardContainer,
    AppFooter
  },
  data() {
    return {
      workspaceData: null,
      error: null,
      errorMessage: null,
      loading: false,
      user: 'anonymous',
      modules: [],
      languages: [],
      selectedLanguage: null
    }
  },
  created() {
    const languageStore = useLanguageStore();

    apiClient.get('/workspace')
        .then(response => {
          this.workspaceData = response.data;
          this.user = this.$keycloak.authenticated ? response.data.payload.user : 'anonymous';
          languageStore.setLanguages(response.data.payload.available_languages.entries.map(entry => entry.localizedNames.ENG));
          this.modules = response.data.payload.available_modules.entries;
          this.languages = response.data.payload.available_languages.entries.map(entry => entry.localizedNames.ENG);
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
  },
  methods: {
    setData(data, error) {
      if (error) {
        this.error = error
      } else {
        this.workspaceData = data
      }
    },
    login() {
      this.$keycloak.login()
    },
    signUp() {
      this.$keycloak.signUp()
    },
    logout() {
      alert("Logout started");
      localStorage.removeItem('jwt');
      this.$keycloak.logout().then(() => {
        this.user = 'anonymous';
        alert("Logout success:", this.user);
      }).catch(error => {
        alert("Logout failed:", error);
      });
    },
    userProfile() {
      this.$keycloak.accountManagement()
    }
  }
}
</script>


