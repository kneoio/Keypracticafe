import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Keycloak from 'keycloak-js';

let keycloak = new Keycloak('/keycloak.json');

keycloak.init({
    onLoad: 'check-sso',
    pkceMethod: 'S256'
}).then((auth) => {
    if (!auth) {
        //window.location.reload();
        console.log("Not Authenticated");
    } else {
        console.log("Authenticated");
    }
}).catch(() => {
    console.log("Could not authenticate");
});

const app = createApp(App)
app.config.globalProperties.$keycloak = keycloak
app.mount('#app')
