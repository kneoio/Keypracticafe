<template>
  <div class="d-flex flex-column vh-100">
    <div class="bg-light border-bottom px-3 py-2">
      <div class="row">
        <div class="col-4 d-flex align-items-center">
          <h2 class="text-start">Semantyca</h2>
        </div>
        <div class="col-3"></div>
        <div class="col-5">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search...">
            <button class="btn btn-outline-secondary me-2" type="button">Search</button>
            <button class="btn btn-outline-secondary me-2" type="button">
              <font-awesome-icon icon="user"/>
              Profile
            </button>
            <button class="btn btn-outline-secondary" type="button"
                    @click.prevent="logout">
              <font-awesome-icon icon="sign-out-alt"/>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-grow-1 overflow-hidden">
      <div class="bg-light border-end p-3" style="width: 250px;">
        <nav>
          <ul class="nav flex-column">
            <li class="nav-item">
              <a href="/workspace" class="nav-link workspace-link" style="text-align: left">
                <font-awesome-icon icon="briefcase" /> Workspace
              </a>
            </li>

            <li class="nav-item"><a href="/projects" class="nav-link" style="text-align: left">Projects</a></li>
            <li class="nav-item"><a href="/tasks" class="nav-link" style="text-align: left">Tasks</a></li>
          </ul>
        </nav>
      </div>

      <div class="flex-grow-1 overflow-auto p-3">
        <document-table-component :documents="documents"/>
      </div>
    </div>
    <app-footer/>
  </div>
</template>


<script>
import DocumentTableComponent from '@/components/DocumentTable.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  components: {
    DocumentTableComponent,
    AppFooter
  }, data() {
    return {
      errorMessage: '',
      user: 'anonymous'
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      this.$keycloak.logout().then(() => {
        this.user = 'anonymous';
      }).catch(error => {
        console.error("Logout failed:", error);
      });
    }
  }
}
</script>


<style scoped>
.workspace-link {
  font-weight: bold;
  color: #0056b3;
  margin-bottom: 10px;
}

.workspace-link:hover {
  text-decoration: underline;
}
</style>
