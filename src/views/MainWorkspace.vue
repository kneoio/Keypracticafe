<template>
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
      <CardContainer />
      <footer>
        <div class="position-fixed bottom-0 start-50 translate-middle-x mb-3 ms-3">
          <select v-model="selectedLanguage" class="form-select">
            <option v-for="(language, index) in languages" :key="index" :value="language">
              {{ language }}
            </option>
          </select>
        </div>
      </footer>

    </div>
  </div>
</template>

<script>
import apiClient from "@/apiClient";
import CardContainer from "@/components/CardContainer.vue";

export default {
  components: {CardContainer},
  data() {
    return {
      workspaceData: null,
      error: null,
      loading: false,
      user: null,
      languages: [],
      selectedLanguage: "English"
    }
  },
  created() {
    apiClient.get('/workspace')
        .then(response => {
          this.workspaceData = response.data;
          this.user = response.data.payload.user;
          this.languages = response.data.payload.available_languages.entries.map(entry => entry.localizedNames.ENG);

        })
        .catch(error => {
          console.log(error);
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
      this.$keycloak.logout()
    },
    userProfile() {
      this.$keycloak.accountManagement()
    }
  }
}
</script>


